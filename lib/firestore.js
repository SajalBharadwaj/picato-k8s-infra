import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// User operations
export async function getUserById(userId) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('[getUserById]', error);
    throw error;
  }
}

export async function createUser(userId, email, name, role) {
  try {
    await setDoc(doc(db, 'users', userId), {
      email,
      name,
      role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('[createUser]', error);
    throw error;
  }
}

export async function updateUser(userId, data) {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('[updateUser]', error);
    throw error;
  }
}

// Menu operations
export async function getMenuItems(category = null) {
  try {
    let q = collection(db, 'menuItems');

    if (category) {
      q = query(q, where('category', '==', category));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('[getMenuItems]', error);
    throw error;
  }
}

export async function getMenuItemById(itemId) {
  try {
    const itemDoc = await getDoc(doc(db, 'menuItems', itemId));
    if (itemDoc.exists()) {
      return { id: itemDoc.id, ...itemDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('[getMenuItemById]', error);
    throw error;
  }
}

export async function createMenuItem(data) {
  try {
    const docRef = doc(collection(db, 'menuItems'));
    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('[createMenuItem]', error);
    throw error;
  }
}

export async function updateMenuItem(itemId, data) {
  try {
    await updateDoc(doc(db, 'menuItems', itemId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('[updateMenuItem]', error);
    throw error;
  }
}

export async function deleteMenuItem(itemId) {
  try {
    await deleteDoc(doc(db, 'menuItems', itemId));
  } catch (error) {
    console.error('[deleteMenuItem]', error);
    throw error;
  }
}

// Cart operations
export async function getCart(userId) {
  try {
    const cartDoc = await getDoc(doc(db, 'carts', userId));
    if (cartDoc.exists()) {
      return cartDoc.data();
    }
    return { items: [], subtotal: 0 };
  } catch (error) {
    console.error('[getCart]', error);
    throw error;
  }
}

export async function updateCart(userId, items, subtotal) {
  try {
    await setDoc(doc(db, 'carts', userId), {
      userId,
      items,
      subtotal,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('[updateCart]', error);
    throw error;
  }
}

export async function clearCart(userId) {
  try {
    await deleteDoc(doc(db, 'carts', userId));
  } catch (error) {
    console.error('[clearCart]', error);
    throw error;
  }
}

// Order operations
export async function createOrder(orderData) {
  try {
    const docRef = doc(collection(db, 'orders'));
    await setDoc(docRef, {
      ...orderData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('[createOrder]', error);
    throw error;
  }
}

export async function getOrders(filters = {}) {
  try {
    let q = collection(db, 'orders');
    const constraints = [];

    if (filters.userId) {
      constraints.push(where('userId', '==', filters.userId));
    }

    if (filters.userEmail) {
      constraints.push(where('userEmail', '==', filters.userEmail));
    }

    if (filters.paymentMethod) {
      constraints.push(where('paymentMethod', '==', filters.paymentMethod));
    }

    if (filters.startDate) {
      constraints.push(where('orderDate', '>=', filters.startDate));
    }

    if (filters.endDate) {
      constraints.push(where('orderDate', '<=', filters.endDate));
    }

    constraints.push(orderBy('orderDate', 'desc'));

    if (filters.limit) {
      constraints.push(limit(filters.limit));
    }

    q = query(q, ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('[getOrders]', error);
    throw error;
  }
}

export async function getUserOrders(userId) {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('orderDate', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('[getUserOrders]', error);
    throw error;
  }
}

// Analytics operations
export async function getTopUserOfMonth() {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const q = query(
      collection(db, 'orders'),
      where('orderDate', '>=', Timestamp.fromDate(startOfMonth)),
      where('orderDate', '<=', Timestamp.fromDate(endOfMonth)),
      where('paymentStatus', '==', 'completed')
    );

    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => doc.data());

    // Group by userId
    const userStats = {};
    orders.forEach(order => {
      if (!userStats[order.userId]) {
        userStats[order.userId] = {
          userId: order.userId,
          userName: order.userName,
          userEmail: order.userEmail,
          totalSpent: 0,
          orderCount: 0,
        };
      }
      userStats[order.userId].totalSpent += order.totalAmount;
      userStats[order.userId].orderCount += 1;
    });

    // Find top by spending
    const topBySpending = Object.values(userStats).sort((a, b) => b.totalSpent - a.totalSpent)[0];
    // Find top by order count
    const topByOrders = Object.values(userStats).sort((a, b) => b.orderCount - a.orderCount)[0];

    return {
      topBySpending: topBySpending || null,
      topByOrders: topByOrders || null,
    };
  } catch (error) {
    console.error('[getTopUserOfMonth]', error);
    throw error;
  }
}

export async function getWeeklySalesData(startDate, endDate) {
  try {
    const q = query(
      collection(db, 'orders'),
      where('orderDate', '>=', Timestamp.fromDate(startDate)),
      where('orderDate', '<=', Timestamp.fromDate(endDate)),
      where('paymentStatus', '==', 'completed')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('[getWeeklySalesData]', error);
    throw error;
  }
}

// Admin management operations
export async function getAdmins() {
  try {
    const q = query(
      collection(db, 'users'),
      where('role', 'in', ['admin', 'super_admin'])
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('[getAdmins]', error);
    throw error;
  }
}

export async function deleteAdmin(userId) {
  try {
    await deleteDoc(doc(db, 'users', userId));
  } catch (error) {
    console.error('[deleteAdmin]', error);
    throw error;
  }
}
