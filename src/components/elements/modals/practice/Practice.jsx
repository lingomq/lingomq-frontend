import { useState } from "react";
import RoundedButton from "../../../ui/buttons/rounded/RoundedButton.jsx";
import styles from "./Practice.module.scss";
import { useEffect } from "react";
import { getLanguages, getUserWords, getUserWordsAsync } from "../../../../services/api/words/words.js";
import SelectField from "../../../ui/fields/select/SelectField.jsx";
import notificationManager from "../../../ui/notification/notificationManager.js";
import { getLanguagesArrayAsync } from "../../../../services/words.js";

const Practice = () => {
    const [languages, setLanguages] = useState();
    const [language, setLanguage] = useState("none");
    const [repeatCount, setRepeatCount] = useState(1);

    const fetchData = async () => {
        const languagesArray = await getLanguagesArrayAsync(10);
        setLanguages(languagesArray);
    }

    const handleSelectLanguageChange = (e) => {
        setLanguage(e.target.value);
    }

    const start = async () => {
        let wordsArray = [];
        const words = await getUserWordsAsync();
        words.data.data.map((item) => { wordsArray.push(item) });
        wordsArray = wordsArray.filter((item) => {
            return item.languageId === language;
        });
        if (wordsArray.length === 0 && language != "none") {
            notificationManager.addNotification("warning", "ПРЕДУПРЕЖДЕНИЕ", "Слов нет в данной коллекции");
        }
        else {
            window.location.href = `/practice/${repeatCount}/${language}`;
        }
    }

    useEffect(() => {
        fetchData();
    }, [setLanguages]);

    return languages && (
        <>
            <p>Практика</p>
            <div className={styles.repeatCount}>
                <p>Количество слов</p>
                <input type="number" name="repeat-count" min="1" value={repeatCount} onChange={(e) => setRepeatCount(e.target.value)}/>
            </div>
            <SelectField labelText="Язык" name="languageId" values={languages} selectStateFunction={(e) => handleSelectLanguageChange(e)}/>
            <RoundedButton text="НАЧАТЬ" onClick={start}/>
        </>
    )
}

export default Practice;