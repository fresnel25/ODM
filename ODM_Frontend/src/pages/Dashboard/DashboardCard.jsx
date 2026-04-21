import { BookDashedIcon, CarrotIcon, TagsIcon, Users2Icon } from "lucide-react";

const DashboardCard = () => {
  return (
    <div>
      <div className="flex gap-4">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
            <Users2Icon className="text-2xl text-base-content" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total Sales
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                $54232
              </strong>
              <span className="text-sm text-green-500 pl-2">+343</span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
            <BookDashedIcon className="text-2xl text-base-content" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total Expenses
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                $3423
              </strong>
              <span className="text-sm text-green-500 pl-2">-343</span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
            <CarrotIcon className="text-2xl text-base-content" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total Customers
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                12313
              </strong>
              <span className="text-sm text-red-500 pl-2">-30</span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
            <TagsIcon className="text-2xl text-base-content" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total Orders
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                16432
              </strong>
              <span className="text-sm text-red-500 pl-2">-43</span>
            </div>
          </div>
        </BoxWrapper>
      </div>
    </div>
  );
};

export default DashboardCard;

function BoxWrapper({ children }) {
  return (
    <div className="bg-base-100 rounded-sm p-4 flex-1 border border-base-300 flex items-center">
      {children}
    </div>
  );
}
