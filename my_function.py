
import pandas as pd
import spacy

nlp = spacy.load("en_core_web_lg") 

def calcuate_similarity(item):
    data = pd.read_excel('./data.xlsx')
    comp_doc = nlp(item)
    comp_doc = nlp(' '.join([token.lemma_.lower() for token in comp_doc if token.pos_ == 'NOUN' or token.pos_ == 'PROPN']))


    similar_lst = ({'Item':[], 'Product':[], 'Detail':[], 'Footprint':[], 'Intensity':[], 'Similarity':[]})
    for ind in range(len(data['Product detail'])):
        text_sm = []
        doc1 = nlp(str(data['Product name (and functional unit)'][ind]))
        doc2 = nlp(str(data['Product detail'][ind]))
        sm_score_a = comp_doc.similarity(doc1)
        sm_score_b = comp_doc.similarity(doc2)
        
        if max(sm_score_a, sm_score_b) >= 0.5:
            similar_lst['Item'].append(ind)
            similar_lst['Product'].append(data['Product name (and functional unit)'][ind])
            similar_lst['Detail'].append(data['Product detail'][ind])
            similar_lst['Footprint'].append(data['Product\'s carbon footprint (PCF, kg CO2e)'][ind])
            similar_lst['Intensity'].append(data['*Carbon intensity'][ind])
            similar_lst['Similarity'].append(max(sm_score_a, sm_score_b))

    similar_lst = pd.DataFrame(similar_lst)
    similar_lst.sort_values(by=['Similarity', 'Footprint', 'Intensity'], ascending=[False, True, True], inplace=True)
    return similar_lst.iloc[0] if len(similar_lst) > 0 else similar_lst
