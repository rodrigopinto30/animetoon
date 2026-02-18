import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <RegisterForm />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-primary hover:underline font-bold">
          Inicia sesión aquí
        </a>
      </p>
    </div>
  );
}
