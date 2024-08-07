# UC-Berkeley-ML-AI---Capstone_Work_Sample

# Hospital Length of Stay Prediction Project

## Executive Summary

Our project aimed to improve hospital resource management by predicting patient length of stay. Using advanced data analysis and machine learning techniques, we've identified key factors affecting stay duration and developed models to optimize patient care and resource allocation.

## Key Findings

### 1. Patient Demographics and Hospital Characteristics

![Distribution of Age by Cluster](images/distribution_age_by_cluster.png)

- Middle-aged patients (31-60 years) form the largest group requiring hospital care.
- Significant variations in patient volumes across hospital types and regions.
- Hospital codes 8 and 28 handle notably higher volumes, suggesting differences in capacity or specialization.

### 2. Length of Stay Patterns

![Distribution of Length of Stay](images/los_dist.png)

- Most common stay durations cluster around 10, 20, and 30 days.
- Longer stays associated with:
  - Trauma admissions
  - Severe illnesses
  - Departments like surgery and TB & Chest disease

### 3. Readmission Insights

![Total Readmissions by Department](images/Total_Readmissions_by_Department.png)

- Higher readmission rates observed in:
  - Trauma cases
  - Moderate to extreme illness severity
  - Gynecology department
- Patients with more than 10 readmissions tend to have significantly longer average stays.

### 4. Key Predictive Factors

Our neural network model's SHAP (SHapley Additive exPlanations) analysis across 5 folds revealed consistent patterns in feature importance:

![Neural Network Feature Importances Fold 1](images/neural_network_feature_importances_f1.png)
![Neural Network Feature Importances Fold 2](images/neural_network_feature_importances_f2.png)
![Neural Network Feature Importances Fold 3](images/neural_network_feature_importances_f3.png)
![Neural Network Feature Importances Fold 4](images/neural_network_feature_importances_f4.png)
![Neural Network Feature Importances Fold 5](images/neural_network_feature_importances_f5.png)

Across all folds and models, including traditional machine learning and deep learning approaches, the following factors consistently emerged as the most influential in predicting length of stay:

- Hospital-specific factors (various hospital codes)
- Number of available extra rooms in the hospital
- Admission deposit amount
- Number of visitors with the patient
- Specific ward types
- Type of admission (particularly emergency and trauma)
- Severity of illness

The consistency of these factors across different folds and modeling approaches underscores their robustness as predictors of hospital length of stay. However, the varying order of importance across folds suggests that the impact of these features may differ slightly depending on the specific subset of data, highlighting the complex nature of predicting hospital stay durations.

## Model Performance

Our deep learning model significantly outperformed traditional methods:

| Model              | Test Accuracy |
|--------------------|---------------|
| Neural Network     | 80.42%        |
| CatBoost           | 42.84%        |
| XGBoost            | 42.41%        |
| Random Forest      | 42.19%        |
| Gradient Boosting  | 41.62%        |
| Logistic Regression| 40.10%        |

### ROC-AUC Curves for Neural Network Model

![ROC-AUC Neural Network](images/roc_nn.png)

The neural network model achieved high AUC scores (0.92 to 1.00) across all classes, indicating excellent predictive performance.

## Business Impact

Implementing our best model could lead to significant cost savings:

- Potential annual savings: $30,388,400
- Substantial reduction in misclassification costs (false positives/negatives)

| Model             | Total Cost    | Savings          |
|-------------------|---------------|------------------|
| Baseline          | $41,388,400   | -                |
| Deep Learning     | $11,000,000   | $30,388,400      |
| CatBoost          | $19,000,000   | $22,388,400      |
| XGBoost           | $19,800,000   | $21,588,400      |

## Recommendations

1. **Resource Allocation**: Optimize based on ward types and illness severity. Focus on high-demand wards (R, Q) and evaluate underutilized wards (P, T, U).

2. **Visitor Management**: Develop structured visitor programs balancing patient support with operational efficiency.

3. **Financial Planning**: Adjust admission deposit strategies to manage patient turnover more effectively.

4. **Tailored Care Plans**: Personalize care based on admission type and illness severity, with special focus on medium-stay patients (10-40 days).

5. **Facility Improvements**: Invest in upgrading bed grades and ensuring adequate extra rooms to improve care quality and management efficiency.

6. **Hospital-Specific Strategies**: Implement best practices from high-performing hospitals, particularly in regions X and Y.

7. **Enhanced Follow-Up Care**: Implement targeted post-discharge support for high-risk patients to reduce readmission rates.

We're confident these data-driven insights will transform our hospital operations, enhancing patient care while significantly reducing costs.
