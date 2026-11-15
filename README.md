# Homepage (compare-workflow.com)

회사 Workflow의 홈페이지이자 서비스 100Start (hundredstart.com)로 들어오는 입구. 첫 화면 · 최신 뉴스 · 사용 사례만 두는 정적 사이트로, 로그인 · DB · 입력 폼 · 쿠키 · 방문 분석이 없다 (문의는 hundredstart.com으로 보낸다).

## 규칙

- 글은 `content/<news|cases>/<slug>/<ko|en>.md`. 그 언어 파일이 있는 글만 그 언어에 나온다.
- 앞머리의 `featured: true`인 글이 첫 화면에 나온다 (종류마다 3개, 없으면 최신 글).
- 화면 글은 코드에 한국어로 쓰고 `t(locale, "…")`로 감싼다. 영어는 `src/i18n/text.ts`에 두며, 빠지면 형 검사에서 멈춘다.
- 디자인은 HundredStart의 design-tokens와 같은 값: 기준값은 `src/app/tokens.css`, 이 사이트가 쓰는 공통 모양만 `src/app/base.css`, 이 사이트에만 쓰는 모양은 `src/app/site.css`. HundredStart의 기준값이 바뀌면 옮겨 온다.
- main에 push하면 `.github/workflows/deploy.yml`이 빌드해 GitHub Pages에 올린다. 도메인은 `public/CNAME`.
- GitHub Pages는 응답 머리글을 걸 수 없어, https는 Pages의 Enforce HTTPS로, 주소 유출 막기는 `<meta name="referrer">`로 한다. 로그인 · 폼이 없어 틀 넣기 막기는 두지 않는다.

## 확인

`npm ci && npx tsc --noEmit && npx next build` → `out/`

버전: v1.2

© 2026 Workflow. All rights reserved.
