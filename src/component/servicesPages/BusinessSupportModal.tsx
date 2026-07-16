import React, { useEffect, useMemo, useState } from "react";
import { X, Check, Plus } from "lucide-react";
import { packages } from "./utils";
import type { PackageType } from "./utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: PackageType;
}

const BusinessSupportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultPackage,
}) => {
  const [step, setStep] = useState(1);
  const [selectedPackageId, setSelectedPackageId] =
    useState<PackageType>("growth");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  useEffect(() => {
    if (defaultPackage) {
      setSelectedPackageId(defaultPackage);
      setSelectedAddons([]);
      setStep(1);
    }
  }, [defaultPackage]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const selectedPackage = useMemo(
    () => packages.find((p) => p.id === selectedPackageId),
    [selectedPackageId]
  );

  const basePrice = selectedPackage?.price || 0;

  const addonTotal = useMemo(() => {
    if (!selectedPackage) return 0;

    return selectedPackage.addons
      .filter((addon) => selectedAddons.includes(addon.name))
      .reduce((sum, addon) => sum + addon.price, 0);
  }, [selectedPackage, selectedAddons]);

  const total = basePrice + addonTotal;

  const toggleAddon = (addonName: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName)
        ? prev.filter((a) => a !== addonName)
        : [...prev, addonName]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-[760px] bg-white shadow-2xl flex flex-col transition-transform duration-300">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#FFD700] to-[#FFB900] px-8 py-6 flex justify-between">
          <div>
            <h2 className="text-[20px] font-semibold">
              Business Support Application
            </h2>
            <p className="text-sm">
              Complete your application in a few steps
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* STEPPER */}
        <div className="flex justify-center items-center bg-[#F7F5EE] gap-4 py-6">
          {["Package", "Services", "Review", "Payment"].map((label, index) => {
            const current = index + 1;
            return (
              <div key={label} className="flex items-center gap-4">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step === current
                      ? "bg-[#FFD400]"
                      : step > current
                      ? "bg-[#D7263D] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > current ? <Check size={16} /> : current}
                </div>
                {current !== 4 && <div className="w-12 h-[2px] bg-gray-300" />}
              </div>
            );
          })}
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h3 className="font-semibold text-lg">
                Step 1: Select Your Package
                <div className="text-[16px] text-[#4A5565]">
                  Choose the package that best fits your business needs
                </div>
              </h3>

              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => {
                    setSelectedPackageId(pkg.id);
                    setSelectedAddons([]);
                  }}
                  className={`border p-5 rounded-xl cursor-pointer transition ${
                    selectedPackageId === pkg.id
                      ? "border-[#FFD700] bg-[#FFFBEA]"
                      : "border-2 border-[#E5E7EB]"
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">{pkg.name}</h4>
                      <p className="text-sm text-gray-600">
                        {pkg.features.length} core services included
                      </p>
                    </div>
                    <div className="font-bold text-lg">£{pkg.price}</div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#D7263D] text-white py-3 rounded-lg mt-6"
              >
                Continue
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && selectedPackage && (
            <>
              <h3 className="font-semibold text-lg">
                Step 2: Select Additional Services
              </h3>

              <div className="mt-4 border border-[#F2A900] bg-[#FFFBEB] rounded-xl p-5 flex justify-between">
                <div>
                  <p className="font-semibold">Selected Package</p>
                  <p className="text-sm text-green-600 mt-1">
                    ✓ {selectedPackage.features.length} core services included
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600">{selectedPackage.name}</p>
                  <p className="font-bold text-lg">£{selectedPackage.price}</p>
                </div>
              </div>

              {/* INCLUDED CORE SERVICES */}
              <div className="mt-6">
                <p className="font-medium mb-3">Included Core Services</p>

                <div className="space-y-3">
                  {selectedPackage.features.map((feature) => (
                    <div
                      key={feature}
                      className="bg-[#FDECEC] rounded-lg px-4 py-3 flex items-center gap-2"
                    >
                      <Check size={16} className="text-[#D7263D]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* OPTIONAL ADDONS */}
              <div className="mt-8">
                <p className="font-medium mb-3">
                  + Optional Additional Services
                </p>

                <div className="space-y-3">
                  {selectedPackage.addons.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.name);

                    return (
                      <div
                        key={addon.name}
                        onClick={() => toggleAddon(addon.name)}
                        className={`flex justify-between items-center p-4 border rounded-xl cursor-pointer transition ${
                          isSelected
                            ? "bg-[#FFFBEA] border-[#FFD400]"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md border border-[#D1D5DB] flex items-center justify-center shrink-0">
                            <Plus size={14} className="text-[#D97706]" />
                          </div>
                          <span>{addon.name}</span>
                        </div>

                        <div className="font-semibold text-[#0B2C5F]">
                          +£{addon.price}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border py-3 rounded-lg"
                >
                  View Packages
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#D7263D] text-white py-3 rounded-lg"
                >
                  Continue to Review
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && selectedPackage && (
            <>
              <h3 className="font-semibold text-lg">Review Your Selection</h3>

              <div className="space-y-4 text-sm">
                <p>
                  <strong>Package:</strong> {selectedPackage.name}
                </p>
                <p>
                  <strong>Base Fee:</strong> £{selectedPackage.price}
                </p>

                <div>
                  <strong>Add-ons:</strong>
                  {selectedAddons.length === 0 ? (
                    <p className="mt-1">None</p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      {selectedPackage.addons
                        .filter((addon) => selectedAddons.includes(addon.name))
                        .map((addon) => (
                          <div
                            key={addon.name}
                            className="flex justify-between"
                          >
                            <span>{addon.name}</span>
                            <span>£{addon.price}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-3 border-t text-lg font-bold">
                  <span>Total</span>
                  <span>£{total}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border py-3 rounded-lg"
                >
                  Back
                </button>

                <button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-[#D7263D] text-white py-3 rounded-lg"
                >
                  Proceed to Payment
                </button>
              </div>
            </>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <>
              <h3 className="font-semibold text-lg">Payment</h3>
              <p className="text-base">
                Total Amount: <strong>£{total}</strong>
              </p>

              <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-4">
                Pay Now
              </button>
            </>
          )}
        </div>

        {/* STICKY FOOTER */}
        <div className="bg-[#0B1F3B] text-white px-8 py-6">
          <div className="flex justify-between text-sm">
            <span>Base Package Fee</span>
            <span>£{basePrice}</span>
          </div>

          <div className="flex justify-between text-sm mt-3">
            <span>Add-ons</span>
            <span>£{addonTotal}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold mt-3 pt-3 border-t border-white/20">
            <span>Total Cost</span>
            <span>£{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSupportModal;