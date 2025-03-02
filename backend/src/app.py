from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os
from chatservice import ChatService

import time

load_dotenv()
app = Flask(__name__, static_folder='../../docs', static_url_path='/')
CORS(app)  # Initialize CORS with the Flask app

# Add specific CORS configuration for the evaluate-challenge endpoint
CORS(app, resources={r"/evaluate-challenge": {"origins": "https://ucberkeley-ml-ai-capstone.com"}})

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

import json

@app.route("/evaluate-challenge", methods=["POST"])
def evaluate_challenge():
    try:
        data = request.get_json()
        user_solution = data.get("code", "")
        challenge_type = data.get("challenge_type", "")
        
        # Instruct the model to return formatted text
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
        
        FORMAT YOUR RESPONSE AS PLAIN TEXT with the following structure:
        
        Score: X/100
        
        Correctness: [Your detailed feedback]
        
        Key Concepts: [Your detailed feedback]
        
        Edge Cases: [Your detailed feedback]
        
        Code Quality: [Your detailed feedback]
        
        Suggestions for Improvement:
        1. [First suggestion]
        2. [Second suggestion]
        3. [Third suggestion]
        
        DO NOT return a JSON object. Return ONLY the formatted text as specified above.
        """
        
        try:
            # Get response
            response_content = chat_service.get_response(evaluation_prompt)
            
            # Force conversion to string if somehow we get a dict
            if isinstance(response_content, dict):
                try:
                    import json
                    response_content = json.dumps(response_content)
                except:
                    response_content = str(response_content)
            
            return jsonify({"response": response_content})
            
        except Exception as e:
            error_msg = str(e)
            print(f"Chat service error: {error_msg}")
            
            # Try to extract useful content from error messages
            if "input_value=" in error_msg:
                try:
                    # Extract the JSON part from the error message
                    import re
                    json_str = re.search(r'input_value=(\{.*?\})', error_msg, re.DOTALL)
                    if json_str:
                        import ast
                        eval_dict = ast.literal_eval(json_str.group(1))
                        
                        # Format extracted content as text
                        formatted_text = ""
                        for key, value in eval_dict.items():
                            if key == "Score":
                                formatted_text += f"Score: {value}\n\n"
                            elif key == "Suggestions for Improvement":
                                formatted_text += f"{key}:\n"
                                if isinstance(value, list):
                                    for i, suggestion in enumerate(value, 1):
                                        formatted_text += f"{i}. {suggestion}\n"
                                else:
                                    formatted_text += f"{value}\n"
                            else:
                                formatted_text += f"{key}: {value}\n\n"
                                
                        return jsonify({"response": formatted_text})
                except Exception as ex:
                    print(f"Error extracting data from error message: {ex}")
            
            # Return a simplified error message
            return jsonify({"response": "Error evaluating your solution. Please try again."}), 500
            
    except Exception as e:
        print(f"Error in evaluate-challenge: {str(e)}")
        return jsonify({"response": f"Error: {str(e)}"}), 500
        
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
