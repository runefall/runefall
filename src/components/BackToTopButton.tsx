import { Button } from '@/components/ui/button';

export default function BackToTopButton({ show }: { show: boolean }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <Button
      data-test-id="back-to-top-button"
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 p-2"
    >
      Back to Top
    </Button>
  );
}
