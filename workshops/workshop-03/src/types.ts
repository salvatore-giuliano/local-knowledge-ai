export type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
};

export type OllamaChatResponse = {
    model: string;
    created_at: string;
    message: {
        role: "assistant";
        content: string;
    };
    done: boolean;
    done_reason?: string;
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    prompt_eval_cached_count?: number;
    prompt_eval_duration?: number;
    eval_count?: number;
    eval_duration?: number;
};

export type OllamaChatChunk = {
    model: string;
    created_at: string;
    message: {
        role: "assistant";
        content: string;
        thinking?: string;
    };
    done: boolean;
    done_reason?: string;
};