import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How is this different from every other dental marketing company I've seen?",
      answer: "Most dental marketing companies sell you a service and measure success in deliverables — posts, leads, impressions. We measure success in one thing: the growth of your aesthetic practice. That means we're accountable to case revenue, not activity. It also means we're selective about who we work with, because our reputation is built on their results."
    },
    {
      question: "Is this just social media management?",
      answer: "No. We don't manage accounts. We engineer identity, narrative, and momentum. Posting is the output—not the goal."
    },
    {
      question: "Will this actually help me get more patients?",
      answer: "Yes—but not by chasing leads. Our strategy builds trust and certainty before a patient ever inquires, which is how premium cases convert at scale."
    },
    {
      question: "How is this different from hiring an agency?",
      answer: "Agencies sell deliverables. We curate careers. Associate to Empire™ is designed to prevent years of wasted time and money with the wrong vendors."
    },
    {
      question: "Do you handle editing and scheduling?",
      answer: "Yes. We remove the operational burden entirely. Your time stays in dentistry, not content management."
    },
    {
      question: "Who is guiding the strategy?",
      answer: "The same team and frameworks that have driven hundreds of millions in aesthetic case revenue for the best dentists in the world."
    },
    {
      question: "What happens after Associate to Empire™?",
      answer: "This is the entry point. Members receive preferred access and 50% reduced rates on ad management and future services, because we are invested in long-term alignment—not short-term transactions."
    },
    {
      question: "Why should I trust this?",
      answer: "Before opening Associate to Empire™, our average client tenure exceeded three years, with a 97% retention rate since 2019. That doesn't happen in dentistry by accident."
    },
    {
      question: "Why are you offering this now?",
      answer: "Because we're tired of watching talented dentists get taken advantage of by bad vendors. This program exists to save time, money, and momentum that can't be recovered."
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Questions
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            What Dentists Ask
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border/50 rounded-lg px-6 bg-card/30 data-[state=open]:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left text-lg font-serif text-foreground hover:text-primary py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
