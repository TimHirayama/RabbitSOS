import { RabbitForm } from "../_components/rabbit-form";

export default function NewRabbitPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">新增兔子</h2>
        <p className="text-muted-foreground">
          填寫兔子基本資料與上傳照片
        </p>
      </div>
      <RabbitForm />
    </div>
  );
}
