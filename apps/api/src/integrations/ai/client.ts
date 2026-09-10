import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';
import { aiConfig } from '../../config/ai';
import { logger } from '@signalforge/logger';
import { AiProviderResponse } from '../../types/ai.types';

export class AiClient {
  private anthropic: Anthropic | null = null;

  constructor() {
    if (aiConfig.anthropic.apiKey) {
      this.anthropic = new Anthropic({
        apiKey: aiConfig.anthropic.apiKey,
      });
    }
  }

  async generateCompletion(
    systemPrompt: string,
    userPrompt: string,
    options: { maxTokens?: number; temperature?: number } = {}
  ): Promise<AiProviderResponse> {
    const startTime = Date.now();
    const provider = aiConfig.getPrimaryProvider();

    try {
      if (provider === 'anthropic' && this.anthropic) {
        return await this.callAnthropic(systemPrompt, userPrompt, options, startTime);
      }

      if (provider === 'openai' && aiConfig.openai.apiKey) {
        return await this.callOpenAI(systemPrompt, userPrompt, options, startTime);
      }

      throw new Error('No AI provider configured');
    } catch (error) {
      logger.error('AI completion failed:', error);
      throw error;
    }
  }

  private async callAnthropic(
    systemPrompt: string,
    userPrompt: string,
    options: { maxTokens?: number; temperature?: number },
    startTime: number
  ): Promise<AiProviderResponse> {
    const response = await this.anthropic!.messages.create({
      model: aiConfig.anthropic.model,
      max_tokens: options.maxTokens || aiConfig.anthropic.maxTokens,
      temperature: options.temperature ?? aiConfig.anthropic.temperature,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const content = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return {
      content,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
      model: response.model,
      latencyMs: Date.now() - startTime,
    };
  }

  private async callOpenAI(
    systemPrompt: string,
    userPrompt: string,
    options: { maxTokens?: number; temperature?: number },
    startTime: number
  ): Promise<AiProviderResponse> {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: aiConfig.openai.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: options.maxTokens || aiConfig.openai.maxTokens,
        temperature: options.temperature ?? aiConfig.openai.temperature,
        response_format: { type: 'json_object' },
      },
      {
        headers: {
          Authorization: `Bearer ${aiConfig.openai.apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    return {
      content: data.choices[0].message.content,
      usage: {
        inputTokens: data.usage.prompt_tokens,
        outputTokens: data.usage.completion_tokens,
      },
      model: data.model,
      latencyMs: Date.now() - startTime,
    };
  }
}

export const aiClient = new AiClient();