"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AdoptionRuleModal } from "@/components/rabbits/adoption-rule-modal";

interface AdoptionButtonProps {
  rabbitId: string;
  rabbitName: string;
  status: string;
}

export function AdoptionButton({
  rabbitId,
  rabbitName,
  status,
}: AdoptionButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        className="flex-1 rounded-full text-lg font-bold shadow-md shadow-orange-100 bg-orange-600 hover:bg-orange-700 text-white"
        disabled={status !== "open"}
        onClick={() => setIsModalOpen(true)}
      >
        {status === "open" ? "申請認養" : "暫停認養"}
      </Button>

      <AdoptionRuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rabbitId={rabbitId}
        rabbitName={rabbitName}
      />
    </>
  );
}
