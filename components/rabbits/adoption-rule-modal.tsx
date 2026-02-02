"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdoptionRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  rabbitId: string;
  rabbitName: string;
}

export function AdoptionRuleModal({
  isOpen,
  onClose,
  rabbitId,
  rabbitName,
}: AdoptionRuleModalProps) {
  const router = useRouter();

  const handleAgree = () => {
    // Redirect to application form with query params
    const params = new URLSearchParams();
    params.set("rabbit_id", rabbitId);
    params.set("rabbit_name", rabbitName);
    router.push(`/adoption/apply?${params.toString()}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-orange-600">
            認養須知 & 申請前確認
          </DialogTitle>
          <DialogDescription>
            為了確保 {rabbitName} 能找到最適合的家，請詳細閱讀以下認養規則。
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] border rounded-md p-4 bg-stone-50 text-stone-700 leading-relaxed">
          <div className="space-y-6">
            <section>
              <h3 className="font-bold text-lg text-stone-900 border-b pb-2 mb-3">
                事前自我評估事項
              </h3>
              <p className="font-medium text-red-600 mb-2">
                以下這2項要求必須都符合才能申請認養兔兔喔!!
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>年滿18歲</li>
                <li>
                  飼養方式為使用長150公分、寬120公分、高90公分以上的圍片或籠子，或採用放養方式飼養
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-lg text-stone-900 border-b pb-2 mb-3">
                我想認養協會的中途兔，該怎麼做？
              </h3>
              <ol className="list-decimal pl-5 space-y-4">
                <li>
                  <span className="font-bold">三不五時就多來逛逛</span>
                  ，等待看對眼、被煞到的兔影出現。
                </li>
                <li>
                  <span className="font-bold">
                    仔細了解中途兔的身家背景、資料。
                  </span>
                </li>
                <li>
                  <span className="font-bold">完整的填寫『認養申請表』。</span>
                  <p className="text-sm text-stone-500 mt-1">
                    協會基於推廣寵物絕育，若您家中有飼養尚未絕育的兔兔，要請您等兔兔完成絕育手術後再來協會申請認養喔!
                  </p>
                </li>
                <li>
                  <span className="font-bold">收到認養申請表後</span>
                  ，協會聯絡人會跟您聯繫，討論認養面談的時間及地點。
                </li>
                <li>
                  <span className="font-bold">在認養面談之前</span>
                  ，若您是新手，協會將請您先來安置中心擔任2小時以上的志工，一方面是要確認您對於兔毛或草屑是否會過敏，另一方面您也可以更加了解飼養兔兔需要做的相關清潔工作。
                  <p className="text-sm text-stone-500 mt-1">
                    不論您是新手或曾經飼養過兔兔或家中已經飼養兔兔，都請先替家中可能即將增加的兔兔成員做好功課，協會不在意您是不是新手，在意的是您對寵物兔的態度與想法；如果做了功課後仍有不清楚的地方，還可以在面談當天提出來，大家一起討論喔！
                  </p>
                </li>
                <li>
                  <span className="font-bold">
                    面談當天請以愉快輕鬆的心情來參加。
                  </span>
                  雖然名義叫做面談，但目的也是讓您跟中途兔本尊碰碰面，看看是不是真的如您的想像與喜愛！人是視覺的動物，您可以摸摸兔兔，同時也讓該兔的中途跟您聊聊，在談話中，中途會告知您該兔的好習慣、壞習慣、個性、健康等等資訊，好讓您參考並再度考慮。
                </li>
                <li>
                  <span className="font-bold">面談結束</span>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>
                      <span className="font-bold text-stone-700">結果A：</span>
                      確認喜歡並願意認養，要請您稍候，等待面談會後的通知，有時會遇到同時多組認養人想認養同一隻兔兔的情況，所以要煩請您耐心等候。
                    </li>
                    <li>
                      <span className="font-bold text-stone-700">結果B：</span>
                      面對面後對該兔的幻想破滅，那還請您再看看，考慮其他的中途兔喔！
                    </li>
                    <li>
                      <span className="font-bold text-stone-700">結果C：</span>
                      經過面談後，您可能會發現許多之前沒有思考過的問題，若您覺得自己尚未準備好飼養兔子，跟協會告知要放棄本次認養也沒有關係，等準備好再來，不會強迫您認養，這也是對於生命負責的重要態度。
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">認養成功與否的決定</span>
                  ，在於您對養兔的態度與認真度，以及適不適合該兔的個性與飼養環境的需求。
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>
                      <span className="font-bold text-stone-700">結果A：</span>
                      認養成功，除移交兔兔外，還必須簽署1式2份的認養同意書。恭喜您完成認養！
                    </li>
                    <li>
                      <span className="font-bold text-stone-700">結果B：</span>
                      若您未認養成功，並不一定表示您不適合養兔，只是經過協會中途『針對這隻中途兔』的評估，您不是最適合的人選而已。請不要氣餒喔！
                    </li>
                    <li>
                      <span className="font-bold text-stone-700">結果C：</span>
                      協會覺得您尚未做好飼養兔子的準備，或是您與協會在飼養理念上不一致，為了以兔兔為優先，因此希望您能準備好之後再來認養。
                    </li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h3 className="font-bold text-lg text-stone-900 border-b pb-2 mb-3">
                為什麼需要這些認養程序？
              </h3>
              <div className="space-y-4 text-stone-600">
                <p>
                  有人會覺得認養過程太繁瑣，為何還要填寫申請書、還要面談之類的？那是因為協會有許多中途兔在剛被救援時的狀況都非常悽慘！有些是嚴重耳疥、有些是有大量寄生蟲、有些是身上有傷口、有些甚至是骨頭外露，兔兔本身痛到沒辦法站立、有些則是充滿攻擊性、有些是飲食及衛生習慣非常非常不好、有些是毛掉得亂七八糟，指甲長到斷掉、有些是有著各種狀況，三天兩頭就得跑醫院向醫生報到...，各式各樣慘不忍睹的狀況都有...
                </p>
                <p>
                  由於每隻兔兔都是協會成員、中途及志工們花了大量的心力來照顧，才能讓這些兔兔們重新找回原本的天真面貌、可愛模樣，有些狀況較差的中途兔，甚至需要花上數個月、大半年來調養，甚至也有超過1年的；更何況每隻中途兔都是接受來自各方的愛心物資、愛心捐款來支付醫療費用及生活所需，才能順利生存下來。因此，讓每隻中途兔都能得到真正的幸福，是所有人的目標與希望！
                </p>
                <p>
                  每位協會成員、中途及志工都有各自的工作、生活、家庭要照顧，或許認養流程不夠簡單迅速，但對於每隻中途兔兔的送養過程，絕對是認真的。從台灣流浪兔保護協會手上送出的兔寶們的健康狀況，對認養人絕對沒有隱瞞並誠實告知的！
                </p>
                <p>
                  所有人付出的種種，圖的是什麼？圖的是希望可以幫助中途兔找到永遠真正的幸福與新家，圖的是當一隻中途兔邁向自己的幸福時，讓下一隻被通報的棄兔能擁有一線光明的機會！
                </p>
                <p>
                  請體諒協會在評估認養人時必須謹慎再謹慎，我們絕非有意刁難認養人，而是希望確保每一隻中途兔能夠得到真正適合的幸福！謝謝大家的體諒與配合！
                </p>
              </div>
            </section>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            再考慮一下
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700 font-bold"
            onClick={handleAgree}
          >
            我已閱讀並同意，前往申請
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
