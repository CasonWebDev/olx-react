import { useLocation } from "react-router-dom";
import useApi from "helpers/OlxApi";

const api = useApi();

export function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

export const getAdsList = async (q, cat, state, page = 1) => {
  let offset = page * 6;
  let json = await api.getAds({
    sort: "desc",
    limit: 6,
    q,
    cat,
    state,
    offset
  });
  json.page = page;

  return json;
};
