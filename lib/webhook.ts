import { createClient } from "./supabase/client"

/**
 * Triggers the n8n webhook asynchronously if configured in `site_config`.
 *
 * @param leadData The data of the newly created lead
 */
export async function triggerWebhook(leadData: any) {
    try {
        const supabase = createClient()

        // Fetch webhook URL from site_config
        const { data: config, error } = await supabase
            .from('site_config')
            .select('webhook_n8n_url')
            .eq('id', 1)
            .single()

        if (error || !config || !config.webhook_n8n_url) {
            // Webhook not configured or error fetching it, fail silently
            return
        }

        const url = config.webhook_n8n_url

        // Fire and forget
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData),
        }).catch((err) => {
            console.error("Failed to send webhook to n8n:", err)
        })

    } catch (err) {
        console.error("Unexpected error triggering webhook:", err)
    }
}
