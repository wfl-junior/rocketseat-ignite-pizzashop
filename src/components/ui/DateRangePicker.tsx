"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { Button } from "~/components/ui/Button";
import { Calendar } from "~/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { cn } from "~/lib/utils";

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  dateRange?: DateRange;
  onDateRangeChange?: (dateRange?: DateRange | undefined) => void;
}

export function DateRangePicker({
  dateRange,
  className,
  onDateRangeChange,
  ...props
}: DateRangePickerProps) {
  return (
    <div {...props} className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            numberOfMonths={2}
            selected={dateRange}
            onSelect={onDateRangeChange}
            defaultMonth={dateRange?.from}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
