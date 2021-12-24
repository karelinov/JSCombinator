export {TPlanBuilder};

import * as ps_module  from './powerset.mjs'

class TPlanBuilder {
  constructor(tplanconfig){
    this.tplanconfig = tplanconfig;

  }

  /**
   * Строит тестплан по переданной в конструкторе спецификации
   * @returns результирующий список кобинаций аспектов в плане
   * массив, каждый элемент (строка) которого - массив со списком объектов aspectgroup с отфильтрованными комбинациями допустимых конфигурацией значений
   */
  buildplan() {
    var result = [];
    var curresult = [[]];

    // Двигаемся по списку аспектов конфигурации тестплана
    for (let i = 0; i < this.tplanconfig.length; i++){
      var prevresult = curresult;
      curresult = [];

      // Получаем списк комбинаций текущего аспекта
      let tpсonfignode = this.tplanconfig[i]; // получаем аспект
      let aspectCombinations = this.combinevalues(tpсonfignode); // получаем все комбинации значений аспекта 
      aspectCombinations = this.restrictvalues(tpсonfignode, aspectCombinations); // усекаем возможные комбинации в соответствии с настройками конфигурации

      // Расширяем текущий тестплан вариациямии текущего аспекта
      for (let j = 0; j < prevresult.length; j++) {
        for (let k = 0; k < aspectCombinations.length; k++) {
          curresult.push(prevresult[j].concat(aspectCombinations[k]))
        }
      }
    }
    result = curresult;
    return result;
  }

  /**
   * Определяет список допустимых комбинаций значений аспекта узла
   */
  restrictvalues(tpnode, combinations) {
    var result = combinations;


    // пока делаем заглушку и возвращаем все комбинации


    return result;
  }

  /**
   * Возвращает список всех комбинаций значений аспектов узла
   * @param {*} tpnode 
   * @returns список комбинаций значений аспекта в виде усечённых объектов aspectgroup
   */
  combinevalues(tpnode) {
    var result = [];

    // извлекаем список идентификаторов значений аспекта
    var aspectValuesIds = [];
    for (const value of tpnode.aspectgroup.values) {
      aspectValuesIds.push(value.id)
    }

    // Составляем комбинации всех значений
    var combinedAspectValues = ps_module.powerset(aspectValuesIds)

    // По массиву комбинаций создаём массив объектов aspectgroup
    // Пробегаемся по массиву с комбинациями
    for (const combinedAspectValue of combinedAspectValues) {
      var aspectgroup =  JSON.parse(JSON.stringify(tpnode.aspectgroup)); // клонируем объект аспекта
      aspectgroup.values = []; // обнуляем список, построим его заново на основе текущей комбинации
      delete aspectgroup.restrictions; // это тоже не нужно
      var aspectGroupValues = JSON.parse(JSON.stringify(tpnode.aspectgroup.values)); // клонируем объект значений

      // пробегаемся по всем значениям комбинации и добавляем в массив только элементы с идентификтаорами из текущей обрабатываемой комбинации
      for(const aspectGroupValue of aspectGroupValues) {
        if (this.ValueInArray(combinedAspectValue, aspectGroupValue.id)) {
          aspectgroup.values.push(aspectGroupValue);
        }
      }
      result.push(aspectgroup); // добавляем созданный аспект с комбинацией значений в результирующий список
    }

    return result;
  }

  /**
   * Проверяет наличие указанного элемента в массиве
   * @param {*} inputarray 
   * @param {*} inputvalue 
   * @returns да/нет
   */
  ValueInArray(inputarray, inputvalue) {
    var result = false;

    for(var i = 0; i< inputarray.length; i++) {
      if (inputarray[i] === inputvalue) {
        result = true;
        break;
      }
    }

    return result;    
  }

  /**
   * Преобразует объект плана из списка массивов объектов aspectgroup
   * В массив, пригодный для печати таблицей
   * @returns Список кастомных объектов с полями - аспектами
   */
  tabularize(inputarray) {
    var result = [];

    // Проходимся по элементам массива - это единичные варианты плана
    for (let i=0; i< inputarray.length; i++) {
      let inputarrayItem = inputarray[i];
      let planItem= new Object();
      planItem.index='';

      // Проходимся по элементам варианта - в них список используемых испектов
      for (let j=0; j< inputarrayItem.length; j++) {
        let inputarrayAspect = inputarrayItem[j];
        if (planItem.index !== '') planItem.index = planItem.index +'.';
        planItem.index = planItem.index +inputarrayAspect.id +'('
        
        let planItemAspect = new Object();
        planItemAspect['name'] = inputarrayAspect.name;
        planItemAspect['values'] = [];

        // Проходимся по элементам аспекта - в них комбинация значений аспекта
        for (let k=0; k< inputarrayAspect.values.length; k++) {
          let inputarrayAspectValue = inputarrayAspect.values[k];

          planItemAspect['values'].push(inputarrayAspectValue.name);

          if (planItem.index[planItem.index.length-1] !== '(') planItem.index = planItem.index +',';
          planItem.index = planItem.index + inputarrayAspectValue.id;
  
        }
        planItem[planItemAspect.name] = planItemAspect.values;
        planItem.index = planItem.index +')'
      }
      result.push(planItem);
    }

    return result;
  }


}

