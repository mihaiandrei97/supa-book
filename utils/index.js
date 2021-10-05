export function mapItem(item, skip=false) {
  const { id, volumeInfo } = item;
  const isbn = volumeInfo?.industryIdentifiers?.find(
    item => item.type === "ISBN_13"
  )?.identifier;

  if (!skip && (!isbn || !volumeInfo?.imageLinks?.thumbnail)) return null;

  return {
    id,
    title: volumeInfo?.title,
    authors: volumeInfo?.authors?.join(' | ') || '',
    publishedDate: volumeInfo?.publishedDate,
    description: volumeInfo?.description || "No Description",
    pageCount: volumeInfo?.pageCount || 0,
    imageLink:volumeInfo?.imageLinks?.thumbnail,
    isbn: isbn,
    categories: volumeInfo?.categories?.join(' | ') || ''
  };
}
