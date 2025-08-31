import { Request, Response, Router } from "express";
import Call, { CallCreationAttributes } from "../models/call";
import Agent from "../models/agent";

const router = Router();

router.post('/webhook', async (req: Request, res: Response) => {
    const { message } = req.body;
    const { type, call, startedAt, durationMs, summary, transcript, assistant: agent } = message;

    if (type === 'end-of-call-report') {
        const callAgent = await Agent.findOne({
            where: {
                vapiAgentId: agent.id 
            }
        });
        if(!callAgent) {
            return res.status(500).json({ error: "agent not found" });
        }

        const newCall: CallCreationAttributes = {
            callId: call.id,
            agentId: callAgent.id,
            startedAt: startedAt,
            durationMs: durationMs,
            summary: summary,
            transcript: transcript
        };
        try {
            await Call.create(newCall);
            return res.status(201).json({ message: 'Call saved' });
        } catch (err: any) {
            console.error("Error:", err.message)
            return res.status(500).json({ error: err.message });
        }
    }

    res.status(200).send('OK');
});

export default router;
