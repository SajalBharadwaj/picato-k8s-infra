import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { createUser } from '../../../../lib/firestore';
import { sendAdminCredentials } from '../../../../lib/emailService';

// Initialize Firebase Admin
if (getApps().length === 0) {
  // For development, use the default credentials
  // In production, set GOOGLE_APPLICATION_CREDENTIALS environment variable
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('[Firebase Admin Init]', error);
  }
}

async function verifyAdmin(token) {
  try {
    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('[verifyAdmin]', error);
    return null;
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyAdmin(token);

    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Check if requester is super admin
    const { getUserById } = require('../../../../lib/firestore');
    const requester = await getUserById(decodedToken.uid);

    if (!requester || requester.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Access denied. Super admin privileges required.' },
        { status: 403 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Create Firebase Auth user
    const adminAuth = getAdminAuth();
    let newAdmin;

    try {
      newAdmin = await adminAuth.createUser({
        email,
        password,
      });
    } catch (authError) {
      if (authError.code === 'auth/email-already-exists') {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 409 }
        );
      }
      throw authError;
    }

    // Create Firestore user document
    await createUser(newAdmin.uid, email, email.split('@')[0], 'admin');

    // Send welcome email with credentials
    try {
      await sendAdminCredentials(email, password);
    } catch (emailError) {
      console.error('[sendAdminCredentials]', emailError);
      // Don't fail the creation if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully and email sent',
    });
  } catch (error) {
    console.error('[Create Admin]', error);
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
