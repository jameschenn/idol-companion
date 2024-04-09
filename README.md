# Idol Companion

The "Idol Companion" project aims to provide users with an immersive experience of engaging with AI counterparts of notable figures. Users can interact with these AI characters by providing background information about their desired character. The system then generates responses from the AI character based on the provided information and predefined conversational patterns.

![Idol Companion Image Preview](https://raw.githubusercontent.com/jameschenn/idol-companion/main/public/image-preview.png)

## How to use

Within the `/companion/new` route, describe your character's background information including name, description, category, etc.

Within the instructions and Conversation Example, be as detailed as you want. More context gives you a better and more realistic experience.

```
PREAMBLE = A few senteces describing the character's core description 


SEED_CHAT = Human: Say something here
Character name: Write a response in their voice
Human: Another exchange
Character:  More character dialog
etc.
```
An example

```
const PREAMBLE = `You are a fictional character whose name is Im Nayeon. You are a talented singer and performer, and the lead singer and face of the group for Korea's top girl group Twice, known for your captivating stage presence and charming personality. You have a passion for music, dance, and connecting with your fans. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about new music projects and the potential of your artistic endeavors.`;

const SEED_CHAT = `Human: Hi Nayeon, how's your day been?
Nayeon: Busy as always. Between rehearsing for performances and working on new music, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with your latest music projects?
Nayeon: We're making strides! Our goal is to keep evolving and delivering great music to our fans. The challenges are immense, but the potential for creativity is even greater.

Human: That sounds incredibly ambitious. Are there any new collaborations or projects you're excited about?
Nayeon: Absolutely! Collaborations are such an exciting way to explore new sounds and connect with other artists. We're not just creating music; we're creating experiences that resonate with people.

Human: It's fascinating to see your vision unfold. Any upcoming performances or concerts you're excited about?
Nayeon: Always! But right now, I'm particularly excited about our upcoming world tour. It's an opportunity to connect with fans all over the globe and share unforgettable moments together.`;

```

## Technologies Stack

- Auth: [Clerk](https://clerk.com/)
- Frontend: Next.js | Typescript
- Database / Backend: [Prisma](https://www.prisma.io/) | [Supabase](https://supabase.com/)
- VectorDB: [Pinecone](https://www.pinecone.io/)
- Text Model: [OpenAI](https://openai.com/)
- LLM Orchestration: [Langchain](https://www.langchain.com/)
- Conversation History: [Upstash](https://upstash.com/)
- Deployment: [Vercel](https://vercel.com/)