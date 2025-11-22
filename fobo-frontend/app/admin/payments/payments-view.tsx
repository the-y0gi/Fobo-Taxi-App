"use client";

import { payments } from "@/lib/dummy/payments";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, IndianRupee, ChevronLeft, ChevronRight } from "lucide-react";

export default function PaymentsView() {
  return (
    <Card className="p-4 sm:p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Payments Received
          </h3>
        </div>
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary w-fit"
        >
          {payments.length} payments
        </Badge>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-6 sm:py-8">
          <CreditCard className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No payments found.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden sm:block overflow-hidden border border-gray-200 rounded-lg">
            <Table>
              <TableHeader className="bg-gray-50/80">
                <TableRow>
                  <TableHead className="font-semibold">Payment ID</TableHead>
                  <TableHead className="font-semibold">User</TableHead>
                  <TableHead className="font-semibold hidden sm:table-cell">Driver</TableHead>
                  <TableHead className="font-semibold">Trip ID</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Mode</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold hidden lg:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {payments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900">
                      {payment.paymentId}
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">
                          {payment.user}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      <p className="text-sm text-gray-700">{payment.driver}</p>
                    </TableCell>

                    <TableCell className="font-medium text-gray-900">
                      {payment.tripId}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1 font-semibold text-green-700">
                        <IndianRupee className="w-3 h-3" />
                        {payment.amount}
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {payment.mode}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge 
                        className={
                          payment.status === "success" 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="hidden lg:table-cell text-gray-700 font-medium">
                      {payment.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards (hidden on desktop) */}
          <div className="sm:hidden space-y-3">
            {payments.map((payment) => (
              <Card
                key={payment.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50/50 transition-colors"
              >
                <div className="space-y-3">
                  {/* Header - Payment ID and Amount */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Payment ID
                      </p>
                      <p className="font-medium text-gray-700">
                        {payment.paymentId}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-green-700">
                      <IndianRupee className="w-3 h-3" />
                      <span>{payment.amount}</span>
                    </div>
                  </div>

                  {/* User and Driver Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        User
                      </p>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-gray-700 text-sm">{payment.user}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        Driver
                      </p>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-gray-700 text-sm">{payment.driver}</p>
                      </div>
                    </div>
                  </div>

                  {/* Trip ID and Payment Mode */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        Trip ID
                      </p>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-gray-700 text-sm">{payment.tripId}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        Mode
                      </p>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 w-full justify-center">
                        {payment.mode}
                      </Badge>
                    </div>
                  </div>

                  {/* Status and Date */}
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        Status
                      </p>
                      <Badge 
                        className={
                          payment.status === "success" 
                            ? "bg-green-100 text-green-800" 
                            : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        Date
                      </p>
                      <p className="text-gray-700 text-sm">{payment.date}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 sm:mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              Showing 1-{payments.length} of {payments.length} payments
            </p>
            <div className="flex gap-2 justify-center sm:justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-300 hover:bg-gray-50"
                disabled
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-300 hover:bg-gray-50"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}