// app/api/login/route.ts
import { NextResponse } from 'next/server';

// const loginSchema = z.object({
//     phone: z.string().min(9, "Số điện thoại phải có ít nhất 9 ký tự"),
//     password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
//   });
export async function POST(request: Request) {
  const body = await request.json()
  const { phone, password } = body


  if (phone === '0123456789' && password === '123456') {
    return NextResponse.json({
      message: 'Đăng nhập thành công!',
      token: 'fake-jwt-token'
    })
  }

  return NextResponse.json(
    { message: 'Số điện thoại hoặc mật khẩu không đúng' },
    { status: 401 }
  )
}
