"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyPhotoUploadModal } from "./daily-photo-upload-modal";
import { Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import {
  updateDailyPhotoOrder,
  deleteDailyPhoto,
  updateDailyPhotoDescription,
} from "../daily-photo-actions";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Types
interface DailyPhoto {
  id: string;
  image_url: string;
  description: string | null;
  sort_order: number;
}

interface DailyPhotoManagerProps {
  rabbitId: string;
  initialPhotos?: DailyPhoto[];
}

// Sortable Item Component
function SortablePhotoItem({
  photo,
  onDelete,
}: {
  photo: DailyPhoto;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: photo.id });

  const [description, setDescription] = useState(photo.description || "");
  const [isSaving, setIsSaving] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleBlur = async () => {
    if (description === photo.description) return;

    setIsSaving(true);
    try {
      const res = await updateDailyPhotoDescription(photo.id, description);
      if (!res.success) {
        toast.error("描述儲存失敗");
      }
    } catch (error) {
      toast.error("儲存錯誤");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-white border rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
    >
      {/* Image Area */}
      <div className="aspect-square relative bg-stone-100">
        <img
          src={photo.image_url}
          alt="Daily"
          className="w-full h-full object-cover"
        />

        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 p-1.5 bg-black/30 text-white rounded cursor-grab active:cursor-grabbing hover:bg-black/50 transition-colors z-10"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        {/* Delete Button with AlertDialog */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" className="h-8 w-8">
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>刪除生活照</AlertDialogTitle>
                <AlertDialogDescription>
                  此動作將會移除這張照片與其描述。
                  <br />
                  請再次確認是否執行刪除？
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(photo.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  確認刪除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Description Area */}
      <div className="p-2 bg-stone-50 min-h-[60px] flex items-center relative">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleBlur}
          placeholder="點擊輸入描述..."
          className="w-full h-full min-h-[50px] bg-transparent border-none resize-none text-sm focus:ring-0 p-1 text-stone-700 placeholder:text-stone-300"
          // Prevent drag events from interfering with text selection if needed,
          // but dnd-kit usually handles this via handle rather than whole card.
          onPointerDown={(e) => e.stopPropagation()}
        />
        {isSaving && (
          <div className="absolute bottom-1 right-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          </div>
        )}
      </div>
    </div>
  );
}

export function DailyPhotoManager({
  rabbitId,
  initialPhotos = [],
}: DailyPhotoManagerProps) {
  const [items, setItems] = useState<DailyPhoto[]>(initialPhotos);
  const router = useRouter();

  useEffect(() => {
    setItems(initialPhotos);
  }, [initialPhotos]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        // Update functionality: Assign new sort_order based on index
        const updates = newItems.map((item, index) => ({
          id: item.id,
          sort_order: index,
        }));

        // Fire and forget (optimistic) - or await if critical
        updateDailyPhotoOrder(rabbitId, updates).then((res) => {
          if (!res.success) toast.error("順序更新失敗");
        });

        return newItems;
      });
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteDailyPhoto(id, rabbitId);
    if (res.success) {
      toast.success("已刪除");
      router.refresh();
    } else {
      toast.error("刪除失敗");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          📸 生活照相簿
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ({items.length} 張)
          </span>
        </CardTitle>
        <DailyPhotoUploadModal
          rabbitId={rabbitId}
          onUploadSuccess={() => router.refresh()}
        />
      </CardHeader>

      <CardContent>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((photo) => (
                <SortablePhotoItem
                  key={photo.id}
                  photo={photo}
                  onDelete={handleDelete}
                />
              ))}
              {items.length === 0 && (
                <div className="col-span-full h-32 flex flex-col items-center justify-center text-stone-400 border-2 border-dashed rounded-lg">
                  <p>目前還沒有生活照</p>
                  <p className="text-sm mt-1">點擊右上角按鈕上傳</p>
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
