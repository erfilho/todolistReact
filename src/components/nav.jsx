export default function Nav() {
  return (
    <>
      <nav class="w-full border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            class="flex flex-row content-center justify-center items-center gap-2 text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            <img className="h-10" src="/list.png"></img>
            <span class="text-2xl font-semibold whitespace-nowrap dark:text-white">
              To Do List
            </span>
          </a>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/tarefas/add"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Nova Tarefa
                </a>
              </li>
              <li>
                <a
                  href="/tarefas"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Tarefas
                </a>
              </li>
              <li>
                <a
                  href="http://github.com/erfilho"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Meu Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
