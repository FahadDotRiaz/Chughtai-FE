export default function FilterData(arr, key) {
  return arr?.filter((item) => {
    const { name } = item;
    return name?.trim().indexOf(key?.trim()) > -1;
  });
}
