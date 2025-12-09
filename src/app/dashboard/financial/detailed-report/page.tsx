// Forcing next.js to render this component as client side component
'use client';

// Importing part
import EmptyTable from '@/components/dashboard/api/emptyTable';
import ErrorTable from '@/components/dashboard/api/errorTable';
import Search from '@/components/dashboard/financialDetailedReport/search';
import FactorsTable from '@/components/dashboard/financialDetailedReport/table';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETWalletOperations } from '@/types/dashboard/api/get';
import { filterType, typeFilterType } from '@/types/dashboard/component';
import { ReactNode, useEffect, useState } from 'react';

// Creating and exporting CartToCart financial page as default
export default function CartToCartFinancialPage(): ReactNode {
  // Defining states of component
  const [searchVal, setSearchVal] = useState<string>('');
  const [paginationNumber, setPaginationNumber] = useState<number>(0);
  const [filter, setFilter] = useState<filterType>("all");
  const [typeFilter, setTypeFilter] = useState<typeFilterType>("all");

  // Fetching data
  const getData = useApiQuery<GETWalletOperations>({
    url: `/finance/wallet/operations?p=${paginationNumber}`,
    queryKey: ["wallet-operations"]
  })

  // Defining variables
  const searchData = getData.data
    ? searchVal === ''
      ? getData.data.operations
      : getData.data.operations.filter((item) =>
        [
          item.service_type,
          item.status_display,
        ].some((field) => field?.toLowerCase().includes(searchVal)),
      )
    : [];

  const typeFiltred = typeFilter === "all" ? searchData : searchData.filter(item => item.type === typeFilter);
  function getSortedData(data: typeof searchData, filter: filterType) {
    const sorted = [...data];

    switch (filter) {
      case "newest":
        return sorted.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "oldest":
        return sorted.sort((a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "most-price":
        return sorted.sort((a, b) => b.amount - a.amount);
      case "least-price":
        return sorted.sort((a, b) => a.amount - b.amount);
      case "all":
      default:
        return sorted;
    }
  };

  const dataToRender = getSortedData(typeFiltred, filter);

  // Using useEffect to make useApiQuery Fetch again while pagination number changes
  useEffect(() => {
    async function handleRefetch() {
      await getData.refetch();
    }

    handleRefetch();
  }, [paginationNumber]);

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:bg-transparent bg-white">
      {
        getData.isLoading
          ? (
            <>
              <Search loading />
              <FactorsTable data={[]} loading />
            </>
          )
          : getData.isError
            ? <ErrorTable />
            : !getData.isLoading && !getData.isError && getData.data
              ? dataToRender.length === 0
                ? (
                  <EmptyTable
                    description='مشتری گرامی لیست ریز گزارشات شما خالی است.'
                    title="هیچ ریز گزارشی ندارید!"
                  />
                ) : (
                  <>
                    <Search
                      onChange={(val) => setSearchVal(val)}
                      hideInput={!getData.isLoading && getData.data && getData.data.total_item === 0}
                      onFilterChange={setFilter}
                      onTypeFilterChange={setTypeFilter}
                    />
                    <FactorsTable
                      data={dataToRender}
                      loading={false}
                      paginationCount={getData.data.total_item}
                      paginationActiveIndex={paginationNumber}
                      setPaginationActiveIndex={setPaginationNumber}
                    />
                  </>
                )
              : false
      }
    </main>
  );
}
