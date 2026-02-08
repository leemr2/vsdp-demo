# T3 + Claude Integration - Quick Start Checklist

Use this checklist to implement the integration step-by-step. It's designed to get you from zero to a working demo in a few hours.

---

## ✅ Phase 1: Setup (30 minutes)

- [ ] **Create T3 project**
  ```bash
  npm create t3-app@latest vsdp-demo -- --typescript --trpc --tailwind
  cd vsdp-demo
  ```

- [ ] **Install Anthropic SDK**
  ```bash
  npm install @anthropic-ai/sdk
  ```

- [ ] **Get Anthropic API key**
  - Go to https://console.anthropic.com/
  - Create API key
  - Add to `.env.local`: `ANTHROPIC_API_KEY=sk-ant-xxxxx`

- [ ] **Verify project runs**
  ```bash
  npm run dev
  # Should see Next.js running at http://localhost:3000
  ```

---

## ✅ Phase 2: Create Core Files (1 hour)

Create these files **in order** from `T3_CLAUDE_SCAFFOLDS.md`:

### Backend Files

1. [ ] **`src/server/api/routers/types.ts`**
   - Copy-paste entire file
   - This defines your request/response types with Zod
   - Result: TypeScript knows what Claude expects/returns

2. [ ] **`src/server/lib/claude.ts`**
   - Copy-paste entire file
   - This wraps the Anthropic SDK with your prompts
   - Contains `getStakeholderSystemPrompt()` - customize for VSDP
   - Result: Single place to manage Claude calls

3. [ ] **`src/server/api/routers/claude.ts`**
   - Copy-paste entire file
   - This creates tRPC procedures (ask, healthCheck)
   - Result: Type-safe API endpoints

4. [ ] **Update `src/server/api/root.ts`**
   - Add the import: `import { claudeRouter } from "./routers/claude";`
   - Add to appRouter: `claude: claudeRouter,`
   - Result: Claude router is registered

### Frontend Files

5. [ ] **`src/components/StakeholderChat.tsx`**
   - Copy-paste entire file
   - This is the reusable chat UI component
   - Result: Beautiful chat interface

6. [ ] **`pages/demo.tsx`** (or `app/demo/page.tsx` if using app router)
   - Copy-paste the example page
   - Import and use `<StakeholderChat>` components
   - Result: Demo page with 4 stakeholder chats

### Config Files

7. [ ] **Update `.env.example`**
   - Add the environment variables section
   - Result: Team knows what env vars are needed

---

## ✅ Phase 3: Test Basic Integration (30 minutes)

- [ ] **Start dev server**
  ```bash
  npm run dev
  ```

- [ ] **Go to demo page**
  - Visit `http://localhost:3000/demo`
  - You should see 4 chat boxes

- [ ] **Test one stakeholder**
  - Click into the "For Optometrists" (provider) section
  - Type: "What is VSDP?"
  - Click Send
  - You should get a response from Claude in ~2 seconds

- [ ] **Test different stakeholders**
  - Ask the same question to all 4 stakeholders
  - Notice how responses are tailored to each perspective
  - This proves the system prompts are working

- [ ] **Test error handling**
  - Try sending empty message (should be disabled)
  - Try very long message (should be rejected)
  - This verifies Zod validation works

---

## ✅ Phase 4: Customize for VSDP (1 hour)

In `src/server/lib/claude.ts`, update the `getStakeholderSystemPrompt()` function:

- [ ] **Provider prompt**
  - Add specific benefits for optometrists
  - Include RetEval ERG, Optos, Visionix references
  - Include patient compliance/ROI numbers
  - Reference digital twin advantages

- [ ] **Pharma prompt**
  - Emphasize recruitment speed (6 weeks vs 18 months)
  - Cost savings calculations
  - Statistical power from continuous monitoring
  - Real-world evidence advantages

- [ ] **EHR prompt**
  - Focus on Epic/Cerner integration
  - Early disease detection examples
  - Care coordination benefits
  - Population health metrics

- [ ] **BigTech prompt**
  - Gaze-based intent detection
  - User state modeling (stress, attention)
  - AR/XR applications
  - Consumer health market size

Test after each update by asking Claude the same question and verifying the response is customized.

---

## ✅ Phase 5: Add Simulator Integration (Optional, 1-2 hours)

*Only do this if you want Claude to reference real data*

- [ ] **Copy Pattern 1-3 from `T3_ADVANCED_PATTERNS.md`**
  - Create `src/server/lib/claude-tools.ts`
  - Create `src/server/api/routers/simulators.ts`
  - Update `src/server/lib/claude.ts` to add `sendClaudeMessageWithTools()`

- [ ] **Create simulator functions**
  - `src/server/lib/simulators/trial-recruitment.ts`
  - Implement `calculateTrialMetrics()`
  - Test by calling simulator directly

- [ ] **Enable tools in router**
  - Update `claude.ts` router to call `sendClaudeMessageWithTools()`
  - Pass `toolExecutor` function

- [ ] **Test tool use**
  - Ask pharma stakeholder: "How long would enrollment take for an AMD trial?"
  - Claude should call `get_trial_metrics` tool
  - Response should include real simulation numbers

---

## 🎯 Usage Patterns: What Works Best

### Simple Chat (No Tools)
**Use when:** You just want Claude to answer questions conversationally

```typescript
const { mutate } = api.claude.ask.useMutation();
mutate({
  message: "How does VSDP help optometrists?",
  stakeholder: "provider",
});
```

**Result:** Claude gives a thoughtful answer based on its system prompt.

---

### Chat With Context (No Tools)
**Use when:** You want conversation history maintained

```typescript
const { mutate } = api.claude.ask.useMutation();
mutate({
  message: "Tell me about ROI",
  stakeholder: "provider",
  context: {
    sessionId: "session-123",
    previousMessages: [
      { role: "user", content: "What is VSDP?" },
      { role: "assistant", content: "VSDP is..." },
    ],
  },
});
```

**Result:** Claude remembers the conversation and gives context-aware answers.

---

### Smart Analysis (With Tools)
**Use when:** You want Claude to reference real simulation data

```typescript
const { mutate } = api.claude.askWithTools.useMutation();
mutate({
  message: "What are the cost savings for an AMD trial?",
  stakeholder: "pharma",
});
```

**What happens:**
1. Claude reads the question
2. Claude decides to call `get_trial_metrics` with condition="amd"
3. Your simulator calculates real numbers
4. Claude incorporates the data into its response
5. User gets precise, data-backed answer

---

## 🧪 Testing Checklist

Before sharing the demo with stakeholders:

- [ ] **Test all 4 stakeholders** with the same question
- [ ] **Test error cases**: Empty input, rate limits, API errors
- [ ] **Test conversation memory**: Ask follow-up questions
- [ ] **Test input validation**: Very long messages
- [ ] **Test response quality**: Is Claude using the system prompt?
- [ ] **Test tool use** (if enabled): Does Claude call simulators?
- [ ] **Test accessibility**: Tab navigation, keyboard submission
- [ ] **Mobile responsive**: Test on phone/tablet

---

## 🚀 Deployment Checklist

When you're ready to share the demo:

- [ ] **Add analytics** (optional but recommended)
  ```bash
  npm install mixpanel-browser
  ```
  Then track: page views, questions asked, stakeholder section time spent

- [ ] **Set up rate limiting** (optional but recommended)
  ```bash
  # Get Upstash Redis
  # Add to .env.local
  UPSTASH_REDIS_REST_URL=
  UPSTASH_REDIS_REST_TOKEN=
  ```

- [ ] **Deploy to Vercel**
  ```bash
  npm install -g vercel
  vercel
  # Follow prompts, add ANTHROPIC_API_KEY
  ```

- [ ] **Test production deployment**
  - Ask Claude a question on production URL
  - Verify it works end-to-end

- [ ] **Share URL with stakeholders**
  - Each section has stakeholder-specific messaging
  - They'll see responses tailored to their role

---

## 📊 Success Metrics

Your integration is working well when:

✅ Claude responds in <3 seconds
✅ Responses are tailored to each stakeholder
✅ No API errors in browser console
✅ Rate limiting prevents abuse (if enabled)
✅ Stakeholders report the demo is helpful

---

## 🔧 Troubleshooting

### "API key error"
- Verify `ANTHROPIC_API_KEY` is in `.env.local`
- Not in `.env.example` or `.env.production`
- Restart dev server after adding env var

### "No text in response"
- Claude API might be returning empty content
- Check Claude's response status in Network tab
- Verify API key has sufficient quota

### "Tool not found"
- Verify tool name in `CLAUDE_TOOLS` matches executor function
- Check `src/server/lib/claude-tools.ts` for typos

### "Rate limited"
- If using Upstash: check Redis is configured
- Check rate limit parameters in middleware.ts
- For demo: set limit high (100 requests/day)

### "tRPC error in console"
- Check browser Network tab for actual error
- Look at server logs for detailed error message
- Verify input matches Zod schema in types.ts

---

## 📚 What Each File Does

| File | Purpose | Type |
|------|---------|------|
| `types.ts` | Zod schemas for request/response | Backend |
| `claude.ts` | Claude API wrapper + prompts | Backend |
| `routers/claude.ts` | tRPC procedures | Backend |
| `StakeholderChat.tsx` | React chat component | Frontend |
| `demo.tsx` | Page with 4 chats | Frontend |

---

## 🎓 Learning Resources

- **tRPC Docs:** https://trpc.io/docs
- **Claude API:** https://docs.anthropic.com/claude/reference
- **T3 Stack:** https://create.t3.gg/
- **Zod Validation:** https://zod.dev/

---

## Timeline Estimate

- **Phase 1 (Setup):** 30 min
- **Phase 2 (Code):** 60 min
- **Phase 3 (Test):** 30 min
- **Phase 4 (Customize):** 60 min
- **Phase 5 (Advanced):** 90 min (optional)

**Total: 2.5-4 hours to full working demo**

After that, enhancement is straightforward:
- Add databases (Firebase, PostgreSQL)
- Add visualizations (Recharts, D3)
- Add more features (patient data, trial simulators)

---

## Next: What to Build After This Works

Once you have the basic Claude integration working, the natural progression is:

1. **Interactive Simulators** → Trial recruitment calculator, risk predictor
2. **Data Visualizations** → OCT progression charts, risk timelines
3. **Patient Journeys** → React Flow diagrams showing care pathways
4. **Database Integration** → Firebase for synthetic patient data
5. **Multi-language Support** → Localize for different regions
6. **Analytics Dashboard** → Track which demo sections engage stakeholders

Each of these builds on the Claude integration foundation you've created.

Good luck! 🚀
