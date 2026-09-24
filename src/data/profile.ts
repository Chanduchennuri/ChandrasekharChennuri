export const P = {
  name: 'Chennuri Chandrasekhar', gh: 'Chanduchennuri',
  github: 'https://github.com/Chanduchennuri',
  linkedin: 'https://www.linkedin.com/in/chandrashekhar-ch-00b913229/', // verify: resume lists /in/Chandrasekhar-CH
  email: 'ch.chandrasekhar781@gmail.com', phone: '+91 90320 98602',
  tagline: 'Software engineer building intelligent systems — backend, data pipelines, LLM apps and agentic AI.',
  summary: 'Backend and full-stack experience in Python, Java, FastAPI, Node.js, React and SQL. REST APIs, relational and NoSQL databases, and AI-augmented features using LLM APIs and RAG.',
  typing: ['Building intelligent systems.', 'Exploring Agentic AI & LLM Engineering.', 'Turning ideas into working systems.'],
}
export const jobs = [
  { role: 'Software Engineering Intern — Data Engineering', org: 'KRIT Services', when: 'Jun 2025 – Oct 2025',
    pts: ['Built ETL pipelines on AWS S3, Azure Data Factory and Snowflake across Bronze/Silver/Gold layers.', 'Moved and transformed data between dev and prod with environment parity.', 'Resolved pipeline inconsistencies via data-quality validation and reconciliation.', 'Tested and refined dbt models for downstream reporting.'], tags: ['Snowflake', 'ADF', 'dbt', 'AWS'] },
  { role: 'Full-Stack & AI Developer', org: 'IdeaSketch · Freelance', when: '',
    pts: ['Shipped React / Node / MongoDB apps for clients.', 'Built FastAPI + LangChain + Pinecone chatbot backends with OpenAI embeddings.', 'Created embeddable JS chatbot widgets over REST.'], tags: ['React', 'FastAPI', 'LangChain', 'Pinecone'] },
]
export const projects = [
  { n: 'F1 Racer', d: 'Full-stack Formula 1 platform with a RAG assistant for natural-language race queries.', t: ['React', 'TypeScript', 'Node', 'MongoDB', 'FastAPI'] },
  { n: 'Cloud Cost Optimization Dashboard', d: 'Compares AWS, Azure and GCP pricing with filtering and cost estimation.', t: ['JavaScript', 'GitHub Pages'] },
  { n: 'Enterprise Retail Analytics', d: 'Conceptual, logical and star-schema modeling with Fact/Dimension design and SCD 1/2.', t: ['SQL', 'Data Modeling'] },
  { n: 'AI Firewall', d: 'AI-assisted network traffic analysis and suspicious-activity detection.', t: ['Python', 'Wireshark', 'ML'] },
  { n: 'AI Tourist Companion', d: 'Conversational travel companion with contextual recommendations.', t: ['Python', 'React', 'Redis', 'HF'] },
  { n: 'Farmkart', d: 'Agriculture platform with multilingual and voice interaction.', t: ['AI', 'Web', 'Voice'] },
  { n: 'IdeaSketch', d: 'Turns ideas into structured concepts, workflows and product directions.', t: ['Next.js', 'Node', 'MongoDB'] },
  { n: 'AI Engineering Workbench', d: 'Editor-style AI developer environment with tools and context.', t: ['React', 'Tailwind', 'AI APIs'] },
]
export const skillGroups: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'C'] },
  { label: 'AI / ML', items: ['LLM APIs', 'RAG Pipelines', 'AI Agents', 'LangChain', 'Embeddings', 'Vector DBs', 'Tool Calling', 'Fine-tuning'] },
  { label: 'Backend', items: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs'] },
  { label: 'Full-Stack', items: ['React', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { label: 'Data', items: ['Snowflake', 'Azure Data Factory', 'dbt', 'ETL/ELT', 'Data Warehousing'] },
  { label: 'Infrastructure', items: ['AWS', 'Azure', 'Docker', 'Linux', 'Git', 'GitHub Actions', 'CI/CD'] },
  // { label: 'Achievements', items: ['Add your achievements here, one per entry'] },
  { label: 'Certifications', items: ['Microsoft Fabric Data Engineer Associate (DP-700)', 'Advanced SQL (HackerRank)', 'Neo4j Graph Database Professional', 'NVIDIA Fundamentals of Deep Learning'] },
  { label: 'Developer Tools', items: ['VS Code', 'Postman', 'Vercel', 'Netlify', 'SAP', 'Power BI'] },
]
export const skills = ['Python', 'Java', 'TypeScript', 'SQL', 'FastAPI', 'Node.js', 'React', 'Tailwind', 'PostgreSQL', 'MongoDB', 'Snowflake', 'dbt', 'ADF', 'Docker', 'LangChain', 'RAG', 'LLM APIs', 'AWS', 'Azure']
export const certs = ['Microsoft Fabric Data Engineer (DP-700)', 'Advanced SQL — HackerRank', 'Neo4j Graph Database Professional', 'NVIDIA Deep Learning Fundamentals']
export const education = [{ s: 'Vishnu Institute of Technology', d: 'B.Tech, AI & ML · 2024–2027 · CGPA 8.6' }, { s: 'Diviseema Polytechnic College', d: 'Diploma, CSE · 2021–2024 · 71%' }]
