"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Car, FileText, Save } from "lucide-react";

interface Vehicle {
  name: string;
  model: string;
  numberPlate: string;
  type: string;
  color: string;
}

interface Documents {
  license: File | null;
  rc: File | null;
  insurance: File | null;
  aadhaar: File | null;
  profilePhoto: File | null;
  carPhoto: File | null;
}

interface Driver {
  name: string;
  phone: string;
  email: string;
  address: string;
  employeeId: string;
  vehicle: Vehicle;
  documents: Documents;
}

export default function AddDriverPage() {
  const [driver, setDriver] = useState<Driver>({
    name: "",
    phone: "",
    email: "",
    address: "",
    employeeId: "EMP-" + Math.floor(1000 + Math.random() * 9000),
    vehicle: {
      name: "",
      model: "",
      numberPlate: "",
      type: "",
      color: "",
    },
    documents: {
      license: null,
      rc: null,
      insurance: null,
      aadhaar: null,
      profilePhoto: null,
      carPhoto: null,
    },
  });

  const handleChange = (field: keyof Driver, value: any) => {
    setDriver((prev) => ({ ...prev, [field]: value }));
  };

  const handleVehicleChange = (field: keyof Vehicle, value: string) => {
    setDriver((prev) => ({
      ...prev,
      vehicle: { ...prev.vehicle, [field]: value },
    }));
  };

  const handleDocumentChange = (field: keyof Documents, file: File | null) => {
    setDriver((prev) => ({
      ...prev,
      documents: { ...prev.documents, [field]: file },
    }));
  };

  const handleSubmit = () => {
    console.log("New Driver Saved:", driver);
    alert("Driver Saved Successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Driver</h1>
          <p className="text-gray-600 text-sm mt-1">Register a new driver to your fleet</p>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {driver.employeeId}
        </Badge>
      </div>

      {/* PERSONAL DETAILS */}
      <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Personal Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Full Name</Label>
            <Input
              value={driver.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter full name"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
            <Input
              value={driver.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter phone number"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              value={driver.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email address"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Employee ID</Label>
            <Input value={driver.employeeId} disabled className="h-10 bg-gray-50" />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-medium text-gray-700">Complete Address</Label>
            <Input
              value={driver.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter complete address"
              className="h-10"
            />
          </div>
        </div>
      </Card>

      {/* VEHICLE DETAILS */}
      <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Car className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Vehicle Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Car Brand</Label>
            <Input
              value={driver.vehicle.name}
              onChange={(e) => handleVehicleChange("name", e.target.value)}
              placeholder="e.g., Toyota, Hyundai"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Car Model</Label>
            <Input
              value={driver.vehicle.model}
              onChange={(e) => handleVehicleChange("model", e.target.value)}
              placeholder="e.g., Innova, Swift"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Number Plate</Label>
            <Input
              value={driver.vehicle.numberPlate}
              onChange={(e) => handleVehicleChange("numberPlate", e.target.value)}
              placeholder="e.g., MH 12 AB 1234"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Vehicle Type</Label>
            <Input
              value={driver.vehicle.type}
              onChange={(e) => handleVehicleChange("type", e.target.value)}
              placeholder="e.g., Sedan, SUV, Hatchback"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Color</Label>
            <Input
              value={driver.vehicle.color}
              onChange={(e) => handleVehicleChange("color", e.target.value)}
              placeholder="e.g., White, Black, Red"
              className="h-10"
            />
          </div>
        </div>
      </Card>

      {/* DOCUMENT UPLOADS */}
      <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Upload Documents</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["license", "rc", "insurance", "aadhaar", "profilePhoto", "carPhoto"] as (keyof Documents)[]).map(
            (doc) => (
              <div key={doc} className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 capitalize">
                  {doc.replace(/([A-Z])/g, " $1")}
                </Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    handleDocumentChange(doc, e.target.files?.[0] ?? null)
                  }
                  className="h-10"
                />
              </div>
            )
          )}
        </div>
      </Card>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <Button 
          className="bg-primary text-white hover:bg-primary/90 px-8 py-2.5 h-11"
          onClick={handleSubmit}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Driver
        </Button>
      </div>
    </div>
  );
}


//api integrate

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { User, Car, FileText, Save, Loader2 } from "lucide-react";
// import { adminService } from "@/api/adminService";

// interface Vehicle {
//   name: string;
//   model: string;
//   numberPlate: string;
//   type: string;
//   color: string;
// }

// interface Documents {
//   license: File | null;
//   rc: File | null;
//   insurance: File | null;
//   aadhaar: File | null;
//   profilePhoto: File | null;
//   carPhoto: File | null;
// }

// interface Driver {
//   name: string;
//   phone: string;
//   email: string;
//   address: string;
//   employeeId: string;
//   vehicle: Vehicle;
//   documents: Documents;
// }

// export default function AddDriverPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [driver, setDriver] = useState<Driver>({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//     employeeId: "EMP-" + Math.floor(1000 + Math.random() * 9000),
//     vehicle: {
//       name: "",
//       model: "",
//       numberPlate: "",
//       type: "",
//       color: "",
//     },
//     documents: {
//       license: null,
//       rc: null,
//       insurance: null,
//       aadhaar: null,
//       profilePhoto: null,
//       carPhoto: null,
//     },
//   });

//   const handleChange = (field: keyof Driver, value: any) => {
//     setDriver((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleVehicleChange = (field: keyof Vehicle, value: string) => {
//     setDriver((prev) => ({
//       ...prev,
//       vehicle: { ...prev.vehicle, [field]: value },
//     }));
//   };

//   const handleDocumentChange = (field: keyof Documents, file: File | null) => {
//     setDriver((prev) => ({
//       ...prev,
//       documents: { ...prev.documents, [field]: file },
//     }));
//   };

//   const handleSubmit = async () => {
//     // Basic validation
//     if (!driver.name || !driver.phone || !driver.email || !driver.address) {
//       alert("Please fill all required fields");
//       return;
//     }

//     if (!driver.vehicle.name || !driver.vehicle.model || !driver.vehicle.numberPlate || !driver.vehicle.type) {
//       alert("Please fill all vehicle details");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Prepare data for API
//       const driverData = {
//         name: driver.name,
//         phone: driver.phone,
//         email: driver.email,
//         address: driver.address,
//         employeeId: driver.employeeId,
//         vehicle: {
//           name: driver.vehicle.name,
//           model: driver.vehicle.model,
//           numberPlate: driver.vehicle.numberPlate,
//           type: driver.vehicle.type,
//           color: driver.vehicle.color
//         }
//       };

//       // Call API to create driver
//       const response = await adminService.drivers.create(driverData);

//       if (response.data.success) {
//         // Upload documents if any files are selected
//         await uploadDocuments(response.data.data.id);
        
//         alert("Driver created successfully!");
//         router.push("/admin/drivers");
//       }
//     } catch (error: any) {
//       console.error("Error creating driver:", error);
//       alert(error.response?.data?.message || "Error creating driver. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadDocuments = async (driverId: string) => {
//     const formData = new FormData();
    
//     // Append all document files
//     Object.entries(driver.documents).forEach(([key, file]) => {
//       if (file) {
//         formData.append(key, file);
//       }
//     });

//     // Only upload if there are files
//     if (formData.has('license') || formData.has('rc') || formData.has('insurance') || 
//         formData.has('aadhaar') || formData.has('profilePhoto') || formData.has('carPhoto')) {
//       try {
//         await adminService.drivers.uploadDocuments(driverId, formData);
//         console.log("Documents uploaded successfully");
//       } catch (error) {
//         console.error("Error uploading documents:", error);
//         // Don't show error to user as driver is already created
//       }
//     }
//   };

//   const generateNewEmployeeId = () => {
//     setDriver(prev => ({
//       ...prev,
//       employeeId: "EMP-" + Math.floor(1000 + Math.random() * 9000)
//     }));
//   };

//   return (
//     <div className="space-y-6 max-w-4xl mx-auto p-4">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Add New Driver</h1>
//           <p className="text-gray-600 text-sm mt-1">Register a new driver to your fleet</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Badge variant="secondary" className="bg-primary/10 text-primary">
//             {driver.employeeId}
//           </Badge>
//           <Button 
//             variant="outline" 
//             size="sm" 
//             onClick={generateNewEmployeeId}
//             className="text-xs"
//           >
//             Refresh ID
//           </Button>
//         </div>
//       </div>

//       {/* PERSONAL DETAILS */}
//       <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
//         <div className="flex items-center gap-2 mb-4">
//           <User className="w-5 h-5 text-primary" />
//           <h2 className="text-lg font-semibold text-gray-900">Personal Details</h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label className="text-sm font-medium text-gray-700">
//               Full Name <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               value={driver.name}
//               onChange={(e) => handleChange("name", e.target.value)}
//               placeholder="Enter full name"
//               className="h-10"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label className="text-sm font-medium text-gray-700">
//               Phone Number <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               value={driver.phone}
//               onChange={(e) => handleChange("phone", e.target.value)}
//               placeholder="Enter phone number"
//               className="h-10"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label className="text-sm font-medium text-gray-700">
//               Email Address <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               type="email"
//               value={driver.email}
//               onChange={(e) => handleChange("email", e.target.value)}
//               placeholder="Enter email address"
//               className="h-10"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label className="text-sm font-medium text-gray-700">Employee ID</Label>
//             <Input value={driver.employeeId} disabled className="h-10 bg-gray-50" />
//           </div>

//           <div className="md:col-span-2 space-y-2">
//             <Label className="text-sm font-medium text-gray-700">
//               Complete Address <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               value={driver.address}
//               onChange={(e) => handleChange("address", e.target.value)}
//               placeholder="Enter complete address"
//               className="h-10"
//               required
//             />
//           </div>
//         </div>
//       </Card>

//       {/* VEHICLE DETAILS */}
//       <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
//         <div className="flex items-center gap-2 mb-4">
//           <Car className="w-5 h-5 text-primary" />
//           <h2 className="text-lg font-semibold text-gray-900">Vehicle Details</h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label className="text-sm font-medium text-gray-700">
//               Car Brand <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               value={driver.vehicle.name}
//               onChange={(e) => handleVehicleChange("name", e.target.value)}
//               placeholder="e.g., Toyota, Hyundai"
//               className="h-10"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label className="text-sm font-medium text-gray-700">
//               Car Model <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               value={driver.vehicle.model}
//               onChange={(e) => handleVehicleChange("model", e.target.value)}
//               placeholder="e.g., Innova, Swift"
//               className="h-10"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label className="text-sm font-medium text-gray-700">
//               Number Plate <span className="text-red-500">*</span>
//             </Label>
//             <Input
//               value={driver.vehicle.numberPlate}
//               onChange={(e) => handleVehicleChange("numberPlate", e.target.value)}
//               placeholder="e.g., MH 12 AB 1234"
//               className="h-10"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label className="text-sm font-medium text-gray-700">
//               Vehicle Type <span className="text-red-500">*</span>
//             </Label>
//             <select
//               value={driver.vehicle.type}
//               onChange={(e) => handleVehicleChange("type", e.target.value)}
//               className="w-full h-10 px-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
//               required
//             >
//               <option value="">Select Vehicle Type</option>
//               <option value="2-seater">2-seater</option>
//               <option value="3-8-seater">3-8-seater</option>
//               <option value="10+-seater">10+-seater</option>
//             </select>
//           </div>

//           <div className="space-y-2">
//             <Label className="text-sm font-medium text-gray-700">Color</Label>
//             <Input
//               value={driver.vehicle.color}
//               onChange={(e) => handleVehicleChange("color", e.target.value)}
//               placeholder="e.g., White, Black, Red"
//               className="h-10"
//             />
//           </div>
//         </div>
//       </Card>

//       {/* DOCUMENT UPLOADS */}
//       <Card className="p-6 border border-gray-200 shadow-sm rounded-xl bg-white">
//         <div className="flex items-center gap-2 mb-4">
//           <FileText className="w-5 h-5 text-primary" />
//           <h2 className="text-lg font-semibold text-gray-900">Upload Documents (Optional)</h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {([
//             { key: "license", label: "Driving License" },
//             { key: "rc", label: "RC Book" },
//             { key: "insurance", label: "Insurance" },
//             { key: "aadhaar", label: "Aadhaar Card" },
//             { key: "profilePhoto", label: "Profile Photo" },
//             { key: "carPhoto", label: "Car Photo" }
//           ] as const).map(({ key, label }) => (
//             <div key={key} className="space-y-2">
//               <Label className="text-sm font-medium text-gray-700">{label}</Label>
//               <Input
//                 type="file"
//                 onChange={(e) =>
//                   handleDocumentChange(key, e.target.files?.[0] ?? null)
//                 }
//                 className="h-10"
//                 accept={key.includes('Photo') ? 'image/*' : '*/*'}
//               />
//               {driver.documents[key] && (
//                 <p className="text-xs text-green-600">
//                   Selected: {driver.documents[key]?.name}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* SAVE BUTTON */}
//       <div className="flex justify-end gap-4">
//         <Button 
//           variant="outline"
//           onClick={() => router.push("/admin/drivers")}
//           className="px-8 py-2.5 h-11"
//         >
//           Cancel
//         </Button>
//         <Button 
//           className="bg-primary text-white hover:bg-primary/90 px-8 py-2.5 h-11"
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Saving...
//             </>
//           ) : (
//             <>
//               <Save className="w-4 h-4 mr-2" />
//               Save Driver
//             </>
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }