import { Avatar } from "@radix-ui/react-avatar";
import { Calendar, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
function SellItemListView({ item, onClick, formatDate, formatCurrency }: any) {
    // Calculate progress percentage
    const progressPercentage = Math.round(
      (item.completedPayments / item.totalPayments) * 100
    );
    // console.log(item, "item");
    
  
    return (
      <div
        className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex flex-col md:flex-row items-start p-4 gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Item Image */}
            <div className="h-14 w-14 rounded-lg overflow-hidden bg-slate-700/50 border border-slate-600/50 flex-shrink-0">
              <img
                src={item.itemImage || "/placeholder.svg"}
                alt={item.itemName}
                className="h-full w-full object-cover"
              />
            </div>
  
            {/* Item Info */}
            <div className="min-w-0 flex-1 md:flex-initial">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-lg text-white truncate group-hover:text-cyan-300 transition-colors">
                  {item.itemName}
                </h3>
                <Badge
            className={`z-10 ${
              item.status === "active"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                : "bg-purple-500/20 text-purple-300 border-purple-500/30"
            }`}
          >
            {item.status === "active" ? "Active" : "Completed"}
          </Badge>
              </div>
              <div className="flex items-center text-xs text-slate-400 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatDate(item.date)}</span>
                <span className="mx-2">•</span>
                <Percent className="h-3 w-3 mr-1 text-cyan-400" />
                <span className="text-cyan-300">{item.rate}% Rate</span>
              </div>
            </div>
          </div>
  
          {/* Middle section with participants */}
          <div className="hidden md:flex flex-1 justify-center mt-4 md:mt-0">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-slate-600/50">
                  <img
                    src={item.customerImage || "/placeholder.svg"}
                    alt={item.customerName}
                  />
                </Avatar>
                <div>
                  <div className="text-xs text-slate-400">Customer</div>
                  <div className="text-sm font-medium">{item.customerName}</div>
                </div>
              </div>
  
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Investor</div>
                  <div className="text-sm font-medium">{item.investorName}</div>
                </div>
                <Avatar className="h-8 w-8 border border-slate-600/50">
                  <img
                    src={item.investorImage || "/placeholder.svg"}
                    alt={item.investorName}
                  />
                </Avatar>
              </div>
            </div>
          </div>
  
          {/* Right section with amount and progress */}
          <div className="w-full md:w-auto flex flex-col items-end gap-2 mt-4 md:mt-0">
            <div className="text-right">
              <div className="text-xs text-slate-400">Total Amount</div>
              <div className="text-base font-medium text-white">
                {formatCurrency(item.totalAmount, item.currency)}
              </div>
            </div>
  
            <div className="w-full md:w-40">
              <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="mt-1 flex justify-between text-xs">
                <span className="text-slate-400">
                  {item.completedPayments}/{item.totalPayments}
                </span>
                <span className="text-cyan-400">{progressPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
export default SellItemListView;  