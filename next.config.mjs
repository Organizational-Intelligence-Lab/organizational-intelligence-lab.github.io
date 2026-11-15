// compare-workflow.com: 정적 파일로 내보냄 (out/), GitHub Pages에 올린다 (.github/workflows/deploy.yml).
// public/의 CNAME (도메인) · .nojekyll (_next 폴더를 그대로 둠)이 out/에 함께 들어간다.

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
