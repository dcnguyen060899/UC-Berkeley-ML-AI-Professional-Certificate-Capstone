from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os
from chatservice import ChatService

import time

load_dotenv()
app = Flask(__name__, static_folder='../../docs', static_url_path='/')
CORS(app)  # Initialize CORS with the Flask app



api_key = os.getenv("OPENAI_API_KEY")
chat_service = ChatService(api_key=api_key)

# put questions and answers here
base_qa = {
    "What was the main goal of your project?": "The main goal of the project was to identify key factors affecting the duration of hospital stays during the COVID-19 pandemic. This involved improving patient care, optimizing resource allocation, and developing targeted strategies to reduce unnecessary extended hospitalizations.",
    
    "How did you analyze the data?": "We performed a comprehensive exploratory data analysis (EDA) that included numerical and categorical feature distributions, group-wise statistics, and heatmaps. We also used machine learning models like Gradient Boosting, Random Forest, CatBoost, XGBoost, and Logistic Regression to predict patient length of stay and identify the most impactful features.",
    
    "What are the key factors that influence the length of hospital stays?": "The key factors influencing the length of hospital stays include the number of visitors with the patient, the ward type, the admission deposit, the bed grade, the availability of extra rooms in the hospital, the type of admission (e.g., emergency, trauma), the severity of illness, and specific hospital and city codes.",
    
    "What were the main insights from the cluster analysis?": "The cluster analysis revealed clear differentiation in hospital quality and patient outcomes across clusters. For example, Cluster 1 indicated premium hospitals with better facilities and higher costs, while Cluster 2 suggested budget hospitals serving lower-income areas. Visitor numbers, resource availability, and patient demographics varied significantly across clusters.",
    
    "What were the main recommendations based on the analysis?": "Key recommendations include improving resource allocation in high-demand wards, enhancing trauma and emergency care in high-demand regions, implementing specialized care for medium-stay patients, and revising financial policies around admission deposits. Additionally, enhanced follow-up care for high-risk patients could reduce readmissions and improve overall patient outcomes.",
    
    "Which machine learning model performed the best in predicting patient length of stay?": "The deep learning model with LSTM layers outperformed traditional machine learning models, achieving an overall accuracy of 80% and the highest potential savings in cost analysis. It was particularly effective in reducing false positives and false negatives, leading to significant cost savings.",
    
    "How did the length of stay correlate with the readmission rate?": "There was a general trend that higher readmission counts were associated with longer lengths of stay. This pattern was particularly evident in trauma cases and patients with severe illnesses, indicating that these patients require more intensive care and are more likely to be readmitted.",
    
    "What were the business implications of your findings?": "The findings suggest that implementing the deep learning model could lead to substantial cost savings of approximately $30 million by minimizing misclassification costs. Improved resource allocation, targeted interventions, and enhanced patient care strategies could also optimize hospital operations and improve patient outcomes.",
    
    "How can hospitals apply the insights from this project?": "Hospitals can use these insights to optimize resource allocation, reduce the length of patient stays, and lower readmission rates. By implementing the recommended strategies, hospitals can improve operational efficiency, enhance patient care quality, and achieve significant cost savings.",
    
    "What were the main challenges you faced during this project?": "The main challenges included dealing with imbalanced data, ensuring model generalization across different hospital types and regions, and accurately predicting outcomes for less common cases. Hyperparameter tuning and feature engineering were also critical to improving model performance."
}
@app.route("/evaluate-challenge", methods=["POST"])
def evaluate_challenge():
    try:
        data = request.get_json()
        user_solution = data.get("code", "")
        challenge_type = data.get("challenge_type", "")
        
        print(f"Received solution ({len(user_solution)} chars) for evaluation")
        
        # Construct the prompt for the AI
        evaluation_prompt = f"""
        Evaluate this solution for the {challenge_type} algorithm challenge:
        
        ```javascript
        {user_solution}
        ```
        
        Check for:
        1. Correctness - Does it implement the required algorithm properly?
        2. Key concepts - Does it handle the core requirements (e.g., tracking differences in fuzzy matching)?
        3. Edge cases - Does it handle null/empty inputs and other edge cases?
        4. Code quality - Is the code well-structured and efficient?
        
        You MUST return your response in valid JSON format with the following structure:
        {
            "score": (a number from 0-100),
            "feedback": "detailed explanation here",
            "improvement_suggestions": ["suggestion 1", "suggestion 2", "etc"]
        }
        """
        
        # Use your existing chat service to get an evaluation
        try:
            response_content = chat_service.get_response(evaluation_prompt)
            print(f"Received API response of length: {len(response_content)}")
        except Exception as api_error:
            print(f"API Error: {str(api_error)}")
            return jsonify({
                "score": 0,
                "feedback": f"Error connecting to evaluation service: {str(api_error)}",
                "improvement_suggestions": ["Try again later"]
            })
        
        # Try to parse as JSON
        try:
            import json
            # First try direct parsing
            evaluation = json.loads(response_content)
            return jsonify(evaluation)
        except json.JSONDecodeError as json_error:
            print(f"JSON Parsing Error: {str(json_error)}")
            try:
                # Look for JSON within the text (sometimes APIs wrap JSON in explanatory text)
                import re
                json_pattern = r'\{[\s\S]*\}'
                match = re.search(json_pattern, response_content)
                if match:
                    evaluation = json.loads(match.group(0))
                    return jsonify(evaluation)
            except:
                pass
            
            # Fall back to text response
            return jsonify({
                "score": 50,
                "feedback": "Your solution was evaluated, but we couldn't format the feedback properly. Here's what our analysis found:\n\n" + response_content,
                "improvement_suggestions": []
            })
            
    except Exception as e:
        print(f"General Error: {str(e)}")
        return jsonify({
            "score": 0,
            "feedback": f"An error occurred during evaluation: {str(e)}",
            "improvement_suggestions": ["Please try again"]
        })

@app.route("/test-evaluation", methods=["GET"])
def test_evaluation():
    return jsonify({
        "score": 85,
        "feedback": "This is a test response. Your solution has good structure and handles the core requirements well.",
        "improvement_suggestions": ["Add more comments", "Consider edge cases"]
    })
        
@app.route("/")
def index():
    return send_from_directory(app.static_folder, 'index.html')
    
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data["message"]

    if user_message in base_qa:
        time.sleep(3)
        return jsonify({"response": base_qa[user_message]})

    response_content = chat_service.get_response(user_message)
    return jsonify({"response": response_content})


@app.route("/api-check", methods=["GET"])
def api_check():
    try:
        # This is a simplified check. Consider a more specific test for API connectivity if necessary.
        response = chat_service.get_response("Hello")
        if response:
            return jsonify(
                {"status": "success", "message": "API connection is working."}
            )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
