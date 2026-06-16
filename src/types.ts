export interface CaseStudy {
  id: string;
  badge: string;
  title: string;
  client: string;
  role: string;
  quote: string;
  accent: string;
  phase: string;
  surface: string;
  ownership: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SystemCard {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
}

export interface MetricItem {
  id: string;
  value: string;
  suffix: string;
  label: string;
  description: string;
  accentColor: 'red' | 'blue';
}

export interface IntegrationTool {
  id: string;
  name: string;
  logoType: string;
  color: string;
}
