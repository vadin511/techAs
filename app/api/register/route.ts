// app/api/register/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

// Dữ liệu giả lập có sẵn 1 người dùng
let users: { name: string; phone: string; email: string; password: string }[] =
  [
    {
      name: "Nguyễn Văn A",
      phone: "0909123456",
      email: "test@example.com",
      password: "secret123", // chỉ là ví dụ, không mã hóa
    },
  ];

const registerSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
    .regex(
      /^0\d{9,}$/,
      "Số điện thoại phải bắt đầu bằng số 0 và chỉ chứa chữ số"
    ),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  email: z.string().email("Email không hợp lệ"),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const { name, phone, email, password } = parsed.data;

  const emailExists = users.find((user) => user.email === email);
  const phoneExists = users.find((user) => user.phone === phone);

  if (emailExists) {
    return NextResponse.json(
      { error: { email: { _errors: ["Email đã tồn tại"] } } },
      { status: 400 }
    );
  }

  if (phoneExists) {
    return NextResponse.json(
      { error: { phone: { _errors: ["Số điện thoại đã tồn tại"] } } },
      { status: 400 }
    );
  }

  users.push({ name, phone, email, password });

  return NextResponse.json({ message: "Đăng ký thành công (dữ liệu tạm)" });
}
