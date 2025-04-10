// app/api/login/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
    .regex(
      /^0\d{9,}$/,
      "Số điện thoại phải bắt đầu bằng số 0 và chỉ chứa chữ số"
    ),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = loginSchema.parse(body);

    if (parsed.phone === "0123456789" && parsed.password === "123456") {
      return NextResponse.json({
        message: "Đăng nhập thành công!",
        token: "fake-jwt-token",
      });
    }

    return NextResponse.json(
      { message: "Số điện thoại hoặc mật khẩu không đúng" },
      { status: 401 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Dữ liệu không hợp lệ",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
