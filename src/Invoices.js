import {
    NavLink, // swapped this out for queryNavLink(custom) to hold search state between pages
    Outlet,
    useSearchParams,
  } from "react-router-dom";
  import { getInvoices } from "./data";
  import QueryNavLink from './QueryNavLink';

  /**
   * 
   * good example for perisiting query params
   * https://blog.logrocket.com/use-state-url-persist-state-usesearchparams/
   */
  
  export default function Invoices() {
    let invoices = getInvoices();
    let [searchParams, setSearchParams] = useSearchParams();
  
    return (
      <div style={{ display: "flex" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
        >
          <input
            value={searchParams.get("filter") || ""}
            placeHolder={'search for an invoice...'}
            onChange={(event) => {
              let filter = event.target.value;
              if (filter) {
                setSearchParams({ filter });
              } else {
                setSearchParams({});
              }
            }}
          />
          {invoices
            .filter((invoice) => {
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let name = invoice.name.toLowerCase();
              return name.includes(filter.toLowerCase());
            })
            .map((invoice) => (
              <QueryNavLink
                style={({ isActive }) => ({
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                })}
                to={`/invoices/${invoice.number}`}
                key={invoice.number}
              >
                {invoice.name}
              </QueryNavLink>
            ))}
        </nav>
        <Outlet />
      </div>
    );
  }