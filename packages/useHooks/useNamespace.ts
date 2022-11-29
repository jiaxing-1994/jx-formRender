//
const NAME = "wk";
export function useNamespace(namespace: string, hasName = true) {
  const name = `${hasName ? `${NAME}-` : ""}${namespace}`;
  const getClass = (symbol: string, ...arg: string[]) => {
    let className = name;
    if (arg.length) {
      className += `${symbol}${arg.join("-")}`;
    }
    return className;
  };
  // 下划线分割
  const u = (...arg: string[]) => {
    return getClass("_", ...arg);
  };
  // 短线分割
  const d = (...arg: string[]) => {
    return getClass("-", ...arg);
  };
  // 双短线分割
  const dd = (...arg: string[]) => {
    return getClass("--", ...arg);
  };
  return {
    ns: name,
    u,
    d,
    dd,
  };
}
