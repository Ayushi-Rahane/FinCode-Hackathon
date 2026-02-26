import pandas as pd
import re

def generate_insights(metrics):
    insights = []
    
    # 1. Liquidity Rule
    liquidity_buffer = metrics.get('liquidity_buffer', 0)
    if liquidity_buffer < 1.0:
        insights.append({
            "type": "liquidity",
            "title": "Critical Liquidity Shortage",
            "priority": "High Priority",
            "issue": f"Your liquidity buffer is {liquidity_buffer:.1f} months, critically below the recommended 3 months threshold.",
            "action": "Urgently secure a working capital line or reduce non-essential outflows to build reserve.",
            "scoreImpact": "+40 pts",
            "metricName": "Liquidity Buffer",
            "metricFrom": f"{liquidity_buffer:.1f}x",
            "metricTo": "3.0x",
            "barWidth": f"{int(min(100, (liquidity_buffer/3.0)*100))}%"
        })
    elif liquidity_buffer < 2.0:
        insights.append({
            "type": "liquidity",
            "title": "Improve Liquidity Buffer",
            "priority": "Medium Priority",
            "issue": f"Your liquidity buffer is {liquidity_buffer:.1f} months, below the recommended 3 months threshold.",
            "action": "Maintain a dedicated reserve account with at least 3 months of operating expenses.",
            "scoreImpact": "+25 pts",
            "metricName": "Liquidity Buffer",
            "metricFrom": f"{liquidity_buffer:.1f}x",
            "metricTo": "3.0x",
            "barWidth": f"{int(min(100, (liquidity_buffer/3.0)*100))}%"
        })
    elif liquidity_buffer >= 3.0:
        insights.append({
            "type": "liquidity_positive",
            "title": "Excellent Liquidity Reserve",
            "priority": "Positive Insight",
            "issue": f"Your liquidity buffer of {liquidity_buffer:.1f} months demonstrates strong financial resilience.",
            "action": "Consider investing excess idle cash into short-term yield-generating instruments.",
            "scoreImpact": "Maintained",
            "metricName": "Liquidity Buffer",
            "metricFrom": f"{liquidity_buffer:.1f}x",
            "metricTo": "3.0x+",
            "barWidth": "100%"
        })

    # 2. Volatility / Stability Rule
    score_stability = metrics.get('score_stability', 0)
    if score_stability < 60:
        insights.append({
            "type": "volatility",
            "title": "Reduce Revenue Volatility",
            "priority": "High Priority",
            "issue": f"Cash flow consistency is low ({int(score_stability)} score), indicating unstable income patterns.",
            "action": "Diversify revenue streams and secure anchor clients for recurring billing.",
            "scoreImpact": "+30 pts",
            "metricName": "Stability Score",
            "metricFrom": f"{int(score_stability)}",
            "metricTo": "80+",
            "barWidth": f"{int(score_stability)}%"
        })
    elif score_stability > 85:
        insights.append({
            "type": "stability_positive",
            "title": "Strong Revenue Consistency",
            "priority": "Positive Insight",
            "issue": f"High cash flow stability ({int(score_stability)} score) observed across the statement period.",
            "action": "Leverage this stability to negotiate better credit terms with lenders.",
            "scoreImpact": "Maintained",
            "metricName": "Stability Score",
            "metricFrom": f"{int(score_stability)}",
            "metricTo": "85+",
            "barWidth": f"{int(score_stability)}%"
        })
        
    # 3. EMI Exposure Rule
    emi_coverage = metrics.get('emi_coverage_ratio', 0)
    if emi_coverage > 0 and emi_coverage < 1.5:
        insights.append({
            "type": "emi",
            "title": "Avoid High EMI Exposure",
            "priority": "High Priority",
            "issue": f"Hypothetical EMI coverage ratio is low ({emi_coverage:.1f}x). Margins are thin against downturns.",
            "action": "Restructure existing loans or avoid additional credit until surplus increases.",
            "scoreImpact": "+35 pts",
            "metricName": "EMI Coverage",
            "metricFrom": f"{emi_coverage:.1f}x",
            "metricTo": "2.5x",
            "barWidth": f"{int(min(100, (emi_coverage/2.5)*100))}%"
        })
    elif emi_coverage > 2.5:
        insights.append({
            "type": "emi_positive",
            "title": "Healthy EMI Coverage",
            "priority": "Positive Insight",
            "issue": f"Your EMI coverage ratio of {emi_coverage:.1f}x provides a very safe buffer against shocks.",
            "action": "You have capacity to safely take on strategic growth capital if needed.",
            "scoreImpact": "Maintained",
            "metricName": "EMI Coverage",
            "metricFrom": f"{emi_coverage:.1f}x",
            "metricTo": "2.5+",
            "barWidth": "100%"
        })

    # 4. Payment Discipline Rule
    bounces = metrics.get('bounces', 0)
    if bounces > 0:
        insights.append({
            "type": "discipline",
            "title": "Strengthen Payment Discipline",
            "priority": "High Priority" if bounces > 2 else "Medium Priority",
            "issue": f"{bounces} returned/bounced transactions detected in the analysis period.",
            "action": "Set up automated payments and maintain a buffer in the operating account.",
            "scoreImpact": f"+{min(bounces * 15, 45)} pts",
            "metricName": "Discipline Score",
            "metricFrom": f"{max(0, 98 - (bounces * 15))}",
            "metricTo": "98",
            "barWidth": f"{max(0, 98 - (bounces * 15))}%"
        })

    # 5. Personalize by Transaction Pattern
    upi_pct = metrics.get('upi_pct', 0)
    if upi_pct > 70:
        insights.append({
            "type": "transaction_pattern",
            "title": "High Digital Transaction Usage",
            "priority": "Low Priority",
            "issue": f"{upi_pct}% of your transactions are via UPI, indicating modern collection practices.",
            "action": "Consider offering incentives for larger B2B NEFT transfers to reduce micro-transaction volume.",
            "scoreImpact": "+5 pts",
            "metricName": "UPI Usage",
            "metricFrom": f"{upi_pct}%",
            "metricTo": "< 50%",
            "barWidth": f"{upi_pct}%"
        })
        
    # 6. Trend-based Insight
    trend = metrics.get('tx_volume_trend', [])
    if len(trend) >= 4:
        first_half = sum([t['volume'] for t in trend[:len(trend)//2]])
        second_half = sum([t['volume'] for t in trend[len(trend)//2:]])
        if second_half > first_half * 1.1:
            insights.append({
                "type": "trend_positive",
                "title": "Transaction Volume Growing",
                "priority": "Positive Insight",
                "issue": "Transaction volume is trending upwards over the analyzed period.",
                "action": "Ensure operational capacity can support the growing volume.",
                "scoreImpact": "Maintained",
                "metricName": "Tx Growth",
                "metricFrom": "Stable",
                "metricTo": "Growing",
                "barWidth": "90%"
            })

    # Sort insights: High (3) > Medium (2) > Low (1) > Positive (0)
    priority_map = {
        "High Priority": 3,
        "Medium Priority": 2,
        "Low Priority": 1,
        "Positive Insight": 0
    }
    
    insights = sorted(insights, key=lambda x: priority_map.get(x["priority"], 0), reverse=True)
    return insights

def aggregate_financials(structured_data):
    """
    Takes the structured transactions and computes financial metrics.
    """
    if not structured_data:
        return {}

    df = pd.DataFrame(structured_data)
    df['date'] = pd.to_datetime(df['date'])

    # Basic Aggregations
    total_deposits = df[df['amount'] > 0]['amount'].sum()
    total_withdrawals = df[df['amount'] < 0]['amount'].abs().sum()
    net_cash_flow = total_deposits - total_withdrawals
    transaction_count = len(df)
    
    # Time boundaries
    start_date = df['date'].min().strftime('%b %Y')
    end_date = df['date'].max().strftime('%b %Y')
    
    # Monthly aggregations
    df['month'] = df['date'].dt.to_period('M')
    
    monthly_data = []
    # Sort groups so they appear in chronological order
    for month_period, group in sorted(df.groupby('month'), key=lambda x: x[0]):
        m_inflow = group[group['amount'] > 0]['amount'].sum()
        m_outflow = abs(group[group['amount'] < 0]['amount'].sum())
        m_net = m_inflow - m_outflow
        
        monthly_data.append({
            "month": month_period.strftime('%b %Y'),
            "inflow": float(m_inflow) if pd.notna(m_inflow) else 0.0,
            "outflow": float(m_outflow) if pd.notna(m_outflow) else 0.0,
            "net_surplus": float(m_net) if pd.notna(m_net) else 0.0
        })

    monthly_inflow = df[df['amount'] > 0].groupby('month')['amount'].sum().mean()
    monthly_outflow = df[df['amount'] < 0].groupby('month')['amount'].sum().abs().mean()
    net_surplus = monthly_inflow - monthly_outflow

    # Volatility Check (std dev of monthly revenues)
    volatility = df[df['amount'] > 0].groupby('month')['amount'].sum().std()
    
    # Seasonality Indicator Calculation (using coefficient of variation)
    if pd.notna(monthly_inflow) and monthly_inflow > 0 and pd.notna(volatility):
        cv = volatility / monthly_inflow
        if cv < 0.2:
            seasonality = "Low Variation"
        elif cv < 0.5:
            seasonality = "Moderate Variation"
        else:
            seasonality = "High Variation"
    else:
        seasonality = "Unknown"
    
    # Liquidity Buffer
    # Buffer = Net Surplus / Avg Monthly Outflow
    liquidity_buffer = net_surplus / monthly_outflow if monthly_outflow else 0.0

    # Cash Flow Consistency Ratio (Positive months / Total months)
    positive_months = sum(1 for m in monthly_data if m["net_surplus"] > 0)
    total_months = len(monthly_data)
    consistency_ratio = (positive_months / total_months) * 100 if total_months > 0 else 0.0

    # Digital Transaction Categorization
    keywords = {
        'UPI': r'UPI',
        'NEFT': r'NEFT',
        'IMPS': r'IMPS',
        'POS': r'POS|PUR',
        'EMI': r'EMI|LOAN',
        'SALARY': r'SALARY',            
        'GST': r'GST',
        'RENT': r'RENT',
        'BOUNCE': r'BOUNCE|RETURN|REJECT'
    }

    categories = {k: 0 for k in keywords}
    
    # For counting transactions per month explicitly (volume trend)
    tx_vol_by_month = {}

    for _, row in df.iterrows():
        narration = str(row['narration']).upper()
        # Track volume
        m_str = row['date'].strftime('%b')
        tx_vol_by_month[m_str] = tx_vol_by_month.get(m_str, 0) + 1
        
        for cat, pattern in keywords.items():
            if re.search(pattern, narration):
                categories[cat] += 1
                
    # Transaction Volume Trend
    tx_volume_trend = [{"month": k, "volume": v} for k, v in tx_vol_by_month.items()]
    # Ensure ordered chronologically
    tx_volume_trend = sorted(tx_volume_trend, key=lambda x: pd.to_datetime(x["month"], format="%b").month)

    # -------------------------------------------------------------
    # 0-100 CREDIT SCORES
    # -------------------------------------------------------------
    # 1. Cash Flow Stability Score (Using Consistency Ratio)
    score_stability = min(100, max(0, consistency_ratio))
    
    # 2. Liquidity Buffer Score (100 if buffer > 3 months)
    score_liquidity = min(100, max(0, (liquidity_buffer / 3.0) * 100))
    
    # 3. EMI Coverage Score (Assuming hypothetical EMI is 10% of monthly inflow)
    estimated_emi = monthly_inflow * 0.10 if monthly_inflow > 0 else 0
    emi_coverage_ratio = (net_surplus / estimated_emi) if estimated_emi > 0 else 0
    score_emi = min(100, max(0, (emi_coverage_ratio / 3.0) * 100)) if emi_coverage_ratio > 0 else 0
    
    # 4. Payment Discipline Score (-15 for every bounced transaction, starting at 98)
    bounces = categories.get('BOUNCE', 0)
    score_discipline = min(100, max(0, 98 - (bounces * 15)))
    
    # Overall Score (Average mapped to 300-900)
    avg_score_100 = (score_stability + score_liquidity + score_emi + score_discipline) / 4
    overall_score = int(300 + (avg_score_100 / 100) * 600)
    
    # Digital Payment Footprint
    total_digital = categories['UPI'] + categories['POS'] + categories['NEFT'] + categories['IMPS'] + 1  # prevent div 0
    upi_pct = int((categories['UPI'] / total_digital) * 100)
    pos_pct = 100 - upi_pct

    try:
        closing_balance = float(df.iloc[-1]['balance']) if not df.empty else 0.0
    except:
        closing_balance = 0.0

    metrics_for_insights = {
        "liquidity_buffer": float(liquidity_buffer) if pd.notna(liquidity_buffer) else 0.0,
        "score_stability": score_stability,
        "emi_coverage_ratio": float(emi_coverage_ratio) if emi_coverage_ratio > 0 else 0.0,
        "bounces": bounces,
        "upi_pct": upi_pct,
        "tx_volume_trend": tx_volume_trend
    }
    
    insights = generate_insights(metrics_for_insights)

    return {
        "period": f"{start_date} – {end_date}",
        "transactions_detected": transaction_count,
        "total_inflow": float(total_deposits) if pd.notna(total_deposits) else 0.0,
        "total_outflow": float(total_withdrawals) if pd.notna(total_withdrawals) else 0.0,
        "net_cash_flow": float(net_cash_flow) if pd.notna(net_cash_flow) else 0.0,
        "avg_monthly_inflow": float(monthly_inflow) if pd.notna(monthly_inflow) else 0.0,
        "avg_monthly_outflow": float(monthly_outflow) if pd.notna(monthly_outflow) else 0.0,
        "net_surplus": float(net_surplus) if pd.notna(net_surplus) else 0.0,
        "volatility": float(volatility) if pd.notna(volatility) else 0.0,
        "seasonality_indicator": seasonality,
        "liquidity_buffer": float(liquidity_buffer) if pd.notna(liquidity_buffer) else 0.0,
        "consistency_ratio": float(consistency_ratio),
        "categories": categories,
        "closing_balance": closing_balance,
        "monthly_data": monthly_data,
        "scores": {
            "overall": overall_score,
            "stability": int(score_stability),
            "liquidity": int(score_liquidity),
            "emi": int(score_emi),
            "discipline": int(score_discipline)
        },
        "digital_footprint": {
            "upi_pct": upi_pct,
            "pos_pct": pos_pct,
            "tx_volume_trend": tx_volume_trend
        },
        "insights": insights
    }
