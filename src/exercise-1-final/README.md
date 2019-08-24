1. Przygotuj test weryfikujący prawidłowe wykonanie programu.
2. Użyj [Extract Function](https://refactoring.com/catalog/extractFunction.html) do wydzielenia funkcji `amountFor` wyliczającej `thisAmount`.
3. Użyj [Replace Temp with Query](https://refactoring.com/catalog/replaceTempWithQuery.html) do wyliczania wartości `vehicle` przy użyciu funkcji `vehicleFor`.
4. Użyj [Inline Variable](https://refactoring.com/catalog/inlineVariable.html) do podmiany zmiennej `vehicle` na wywołania funkcji `vehicleFor` i usuń zbędny argument z `vehicleFor`.
5. Użyj [Extract Function](https://refactoring.com/catalog/extractFunction.html) do wydzielenia funkcji `volumeCreditsFor` wyliczającej `volumeCredits`.
6. Użyj [Change Function Declaration](https://refactoring.com/catalog/changeFunctionDeclaration.html) do zmiany funkcji `format` na `pln` i przeniesienia dzielenia przez 100 do jej wnętrza.
7. Wykonaj po kolei:

- Użyj [Split Loop](https://refactoring.com/catalog/splitLoop.html) do wydzielenia wyliczania `volumeCredits`.
- Użyj [Slide Statements](https://refactoring.com/catalog/slideStatements.html) i zgrupuj utworzenie i wyliczenie zmiennej `volumeCredits`
- Użyj [Extract Function](https://refactoring.com/catalog/extractFunction.html) do wydzielenia funkcji `totalVolumeCredits()` wyliczającej `volumeCredits`.
- Użyj [Replace Temp with Query](https://refactoring.com/catalog/replaceTempWithQuery.html) do wyliczania wartości `volumeCredits` przy użyciu funkcji `totalVolumeCredits()`.
- Użyj [Inline Variable](https://refactoring.com/catalog/inlineVariable.html) do podmiany zmiennej `volumeCredits` na wywołania funkcji `totalVolumeCredits()`.

8. Zastosuje kroki z punktu 7 dla `totalAmount`
9. Użyj [Split Phase](https://refactoring.com/catalog/splitPhase.html) do rozdzielenie wyliczania danych od ich renderowania do formatu tekstowe.
10. Użyj [Replace Conditional with Polymorphism](https://refactoring.com/catalog/replaceConditionalWithPolymorphism.html) do pozbycia się wyrażenia `switch`.

- Stwórz klasę wyliczającą dane do renderowania
- Użyj [Replace Type Code with Subclasses](https://refactoring.com/catalog/replaceTypeCodeWithSubclasses.html) i Użyj [Replace Constructor with Factory Function](https://refactoring.com/catalog/replaceConstructorWithFactoryFunction.html) do przeniesienia logiki wyliczania danych.
