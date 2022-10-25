export default async function handler(req, res) {
  let revalidated = false;

  try {
    await res.unstable_revalidate(1);
    revalidated = true;
  } catch (err) {
    console.error(err);
  }

  res.status(200).json({ revalidated });
}
