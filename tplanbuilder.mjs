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

    // первый уровень
    var flnodes = this.tplanconfig.start.aspects;
    for (var i = 0; i < flnodes.length; i++){
      var nodeobj = flnodes[i];
      result[i] = [];
      result[i][0] = nodeobj;
    }
    return result;
  }

  /**
   * 
   */
  recurse(tpnode) {
    var result = [];

    for (var i = 0; i < tpnode. length; i++){
      var nodeobj = flnodes[i];
      result[i] = [];
      result[i][0] = nodeobj;
    }



  }

  /**
   * Определяет список допустимых комбинаций значений аспекта узла
   */
  restrictvalues(tpnode,parenttpnode) {
    var result = [];


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
    var aspectValuesIds = [tpnode.values.length];
    for (const value of tpnode.values) {
      aspectValuesIds.push(value.id)
    }

    // Составляем комбинации всех значений
    var combinedAspectValues = ps_module.powerset(aspectValuesIds)

    // По массиву комбинаций создаём массив объектов aspectgroup
    // Пробегаемся по массиву с комбинациями
    for (const value of combinedAspectValues) {
      var aspectgroup =  JSON.parse(JSON.stringify(tpnode.aspectgroup)); // клонируем объект аспекта
      aspectgroup.values = []; // обнуляем список, построим его заново на основе текущей комбинации
      var aspectgroupvalues = JSON.parse(JSON.stringify(tpnode.aspectgroup.values)); // клонируем объект значений

      // пробегаемся по всем значениям комбинации и добавляем в массив только элементы с идентификтаорами из текущей обрабатываемой комбинации
      for(const value of aspectgroupvalues) {
        if (this.ValueInArray(combinedAspectValues, value.id)) {
          aspectgroup.values.push(value);
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


}

