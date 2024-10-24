export default function NgoStore() {
  return (
    <div className="h-90 md:h-full w-full md:w-full bg-slate-100 border rounded-xl p-4 space-y-2 overflow-auto">
      <h1 className="text-lg md:text-xl font-semibold">
        Food Products Collected on Center
      </h1>
      <div>
        <div className="py-2 px-5 bg-white rounded-lg cursor-pointer mb-3">
          <div className="text-base md:text-base truncate">
            <span className="font-semibold">Food Item</span> : Pav Bhaji
          </div>
          <div className="text-base md:text-base truncate">
            <span className="font-semibold">Food Quantity</span> : 100 Kg
          </div>
          <div className="text-base md:text-base truncate">
            <span className="font-semibold">Food Donation Date</span> : 20/10/24
          </div>
        </div>
      </div>
    </div>
  );
}
