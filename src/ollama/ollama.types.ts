export interface OllamaGenerateRequest {
    model: string;
    prompt: string;
    stream?: boolean;
}

export interface OllamaGenerateResponse {
    model: string;
    created_at: string;
    response: string;
    thinking?: string;
    done: boolean;
    done_reason?: string;

    total_duration?: number;
    load_duration?: number;

    prompt_eval_count?: number;
    prompt_eval_cached_count?: number;
    prompt_eval_duration?: number;

    eval_count?: number;
    eval_duration?: number;
}