# Remove global api key configuration to avoid freezing None State
import os
import google.generativeai as genai
from dotenv import load_dotenv

def generate_ai_narrative(metrics):
    """
    Takes financial metrics and prompts Gemini to return a short, 
    personalized advisory narrative.
    """
    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not api_key:
        return "AI Advisory is currently unavailable because the API key is missing."
        
    genai.configure(api_key=api_key)

    # Extract key metrics for the prompt
    surplus = metrics.get('net_surplus', 0)
    liquidity = metrics.get('liquidity_buffer', 0)
    volatility = metrics.get('volatility', 0)
    consistency = metrics.get('consistency_ratio', 0)
    emi_coverage = metrics.get('emi_coverage_ratio', 0)
    
    # Simple trend description
    trend_data = metrics.get('tx_volume_trend', [])
    trend_desc = "Stable"
    if len(trend_data) >= 4:
        first_half = sum([t['volume'] for t in trend_data[:len(trend_data)//2]])
        second_half = sum([t['volume'] for t in trend_data[len(trend_data)//2:]])
        if second_half > first_half * 1.1:
            trend_desc = "Growing (+10% volume)"
        elif second_half < first_half * 0.9:
            trend_desc = "Declining (-10% volume)"

    # Build the prompt
    prompt = f"""
    You are an expert, premium AI financial advisor for small-to-medium businesses (SMEs).
    Write a short, intelligent, human-like financial commentary (2-3 sentences max) based on the following metrics:
    - Net Surplus: ₹{surplus}
    - Liquidity Buffer: {liquidity:.1f} months
    - Revenue Volatility: {volatility} (Consistency Ratio: {consistency:.1f}%)
    - Hypothetical EMI Coverage: {emi_coverage:.1f}x
    - Recent Transaction Trend: {trend_desc}
    
    The commentary should feel premium and personalized. 
    Focus on the most critical vulnerability or the strongest asset. Use specific numbers from the metrics provided.
    Do not use introductory phrases like "Here is your commentary", just supply the final narrative paragraph.
    Make it sound highly professional but accessible.
    """

    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return "AI Advisory analysis could not be generated at this time."
