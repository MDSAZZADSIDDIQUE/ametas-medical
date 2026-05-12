import Link from 'next/link';
import Image from 'next/image';

interface BreadcrumbBannerProps {
  title: string;
  currentPage: string;
}

const BreadcrumbBanner = ({ title, currentPage }: BreadcrumbBannerProps) => {
  return (
    <section className="relative h-[250px] lg:h-[300px] w-full overflow-hidden">
      <Image
        src="/images/banner/cloud_banner.jpg"
        alt="Banner"
        fill
        className="object-cover brightness-90"
        priority
      />
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container">
          <div className="text-primary">
            <h1 className="text-4xl lg:text-5xl font-semibold mb-4 uppercase tracking-tight">{title}</h1>
            <div className="flex items-center gap-3 text-sm font-bold">
              <Link href="/" className="opacity-60 hover:opacity-100 transition-opacity uppercase tracking-widest">HOME</Link>
              <span className="opacity-30">|</span>
              <span className="uppercase tracking-widest">{currentPage}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbBanner;
