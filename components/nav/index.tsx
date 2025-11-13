import Link from "next/link";

const index = () => {
  return (
    <div className="flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
    </div>
  );
};

export default index;
