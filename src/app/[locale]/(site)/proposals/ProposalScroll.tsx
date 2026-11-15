/**
 * Native scrolling for proposal pages. The site styles html and body as two scroll containers
 * with `overscroll-behavior: none`, which only works while ScrollSmoother drives the page. The
 * proposals run without it (their scenes are pinned), so the body must not catch the wheel.
 */
export default function ProposalScroll() {
  return (
    <style>{`html{overflow-x:clip;overflow-y:auto;overscroll-behavior-y:auto;scroll-behavior:smooth}body{overflow:visible!important;overscroll-behavior:auto}`}</style>
  );
}
