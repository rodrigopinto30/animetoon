import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-6">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-background" />
      </div>

      <div className="w-full max-w-md">
        <LoginForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <span className="text-primary hover:underline cursor-pointer font-medium">
            Contáctanos para obtener acceso
          </span>
        </p>
      </div>
    </main>
  );
}
