import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CardStats({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
