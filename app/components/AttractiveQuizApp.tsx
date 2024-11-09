'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Trophy } from 'lucide-react'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

const quizQuestions = [
    {
      question: "How does the usage of IoT benefit the Oil and Gas industries?",
      options: ["Decrease production efficiency", "Save cost and time", "Diminish work safety", "Reduce Production"],
      correctAnswer: 1,
      justification: "Please refer to Slide 9 of Lecture 1 of Week 12"
    },
    {
      question: "Which of the following can be achieved by performing predictive maintenance using IoT in the chemical industry?",
      options: ["Increased equipment breakdown", "Improve quality by efficient IoT analytics programs", "Deteriorating service", "None of the above"],
      correctAnswer: 1,
      justification: "Please refer to Slide 12 of Lecture 1 of Week 12"
    },
    {
      question: "How does the use of IoT help in the Chemical Industry?",
      options: ["By significantly increasing the energy expenses", "By maximizing supply chain risk", "By impairing Quality and equipment management", "By improving logistics"],
      correctAnswer: 3,
      justification: "Please refer to Slide 11 of Lecture 1 of Week 12"
    },
    {
      question: "Which of the following is true about second-generation UAVs?",
      options: [
        "Transformable designs with 360° gimbals, high-quality video or higher-value instrumentation, and improved piloting modes.",
        "Transformable designs, 1080 HD video or higher-value instrumentation, three-axis gimbals, improved safety modes, and autopilot modes.",
        "Static design, fixing camera mount, still photography, video recording, and manual steering control",
        "Enhanced intelligent piloting models and full autonomy, full airspace awareness, auto action (takeoff, land, and mission execution)"
      ],
      correctAnswer: 2,
      justification: "Please refer to Slide 4 of Lecture 2 of Week 12"
    },
    {
      question: "How does IoT help in condition-based monitoring in the chemical industry?",
      options: ["By predicting quality by continuous monitoring", "By performing water, nutrients, and pesticide analysis", "By adjusting the amount of required material", "All of the above"],
      correctAnswer: 3,
      justification: "Please refer to Slide 13 of Lecture 1 of Week 12"
    },
    {
      question: "How do IoT sensors benefit the pharmaceutical industry in terms of monitoring?",
      options: ["By increasing the production cost", "By increasing the overall wastage", "By rendering real-time monitoring", "By increasing manual inspections"],
      correctAnswer: 2,
      justification: "Please refer to Slide 18 of Lecture 1 of Week 12"
    },
    {
      question: "Which of the following statements is false about the application of UAVs in Industry?",
      options: [
        "UAVs gather integration of the measurements using IoT sensors",
        "Always communicates indirectly to an industrial control system such as the SCADA",
        "UAVs are capable of taking aerial imagery, visual imagery, thermal imagery, and also radio-frequency imagery of factory stations and substations",
        "UAVs have an end-to-end connection via wireless, from user to controller"
      ],
      correctAnswer: 1,
      justification: "Please refer to Slide 3 of Lecture 2 of Week 12"
    },
    {
      question: "IoT applications in construction sites help in inspecting structures by taking continuous complex readings instead of employing lots of workers and heavy software. State True or False.",
      options: ["True", "False"],
      correctAnswer: 0,
      justification: "Please refer to Slide 8 of Lecture 2 of Week 12"
    },
    {
      question: "What are the benefits that can be achieved by the application of UAVs in agriculture?",
      options: ["Decrease effective yields", "Save time by helping farmers in scouting their crops", "Ineffective use of seed, fertilizer, water", "None of the above"],
      correctAnswer: 1,
      justification: "Please refer to Slide 6 of Lecture 2 of Week 12"
    },
    {
      question: "Which of the following is not an application of UAVs in Construction Sites?",
      options: ["Monitoring job sites", "A quick survey of required job areas", "Transportation of heavy weight and bulky construction materials", "Inspecting structures"],
      correctAnswer: 2,
      justification: "Please refer to Slide 8 of Lecture 2 of Week 12"
    },
    {
      question: "What is/are the application(s) of UAVs in Forestry?",
      options: ["Forest management", "3D mapping of carbon storage in the forest", "Resist deforestation and increase security", "All of the above"],
      correctAnswer: 3,
      justification: "Please refer to Slide 19 of Lecture 2 of Week 12"
    },
    {
      question: "By the application of UAVs, it is possible to detect leakage of oil and gas pipelines, oil spill detection and damage assessment. State True or False.",
      options: ["True", "False"],
      correctAnswer: 0,
      justification: "Please refer to Slide 15 of Lecture 2 of Week 12"
    },
    {
      question: "UAV-based light displays are less expensive than traditional firework displays and can be reused. State True or False.",
      options: ["True", "False"],
      correctAnswer: 0,
      justification: "Please refer to Slide 20 of Lecture 2 of Week 12"
    },
    {
      question: "Which of the following cannot be achieved by using UAVs in mining?",
      options: ["Identify misfire and wall damage", "Site exploration", "Automated underground tunnel construction", "Manage stockpiles"],
      correctAnswer: 2,
      justification: "Please refer to Slide 10 of Lecture 2 of Week 12"
    },
    {
      question: "Case studies provide in-depth knowledge and clarity of concepts regarding the research topic. State True or False.",
      options: ["True", "False"],
      correctAnswer: 0,
      justification: "Please refer to Slide 2 of Lecture 3 of Week 12"
    },
    {
      question: "IIoT-enabled healthcare infrastructure can facilitate the monitoring of patient’s health conditions remotely. State True or False.",
      options: ["True", "False"],
      correctAnswer: 0,
      justification: "Please refer to Slide 8 of Lecture 1 of Week 11"
    },

    
        {
          question: "How does the usage of IoT benefit the Oil and Gas industries?",
          options: ["Decrease production efficiency", "Save cost and time", "Diminish work safety", "Reduce Production"],
          correctAnswer: 1,
          justification: "Please refer to Slide 9 of Lecture 1 of Week 12"
        },
        // Add rest of the original questions here...
      
        // New questions
        {
          question: "Network monitoring, management, and optimization are performed at the ___________ of the SDIIoT architecture.",
          options: ["Data plane", "Application plane", "Control plane", "User plane"],
          correctAnswer: 2,
          justification: "Please refer to Slide 4 of Lecture 1 of Week 10"
        },
        {
          question: "S stands for __________ in SCADA.",
          options: ["Supervisory", "Satisfactory", "Superficial", "Suspended"],
          correctAnswer: 0,
          justification: "Please refer to Slide 13 of Lecture 1 of Week 10"
        },
        {
          question: "Which of the following statements is false about Software-Defined 6TiSCH?",
          options: [
            "Slicing mechanism is proposed in Layer-256",
            "Slicing mechanism isolates the control overhead",
            "Allows deterministic and low-latency SDN controller communication",
            "Advantages of SDN is utilized, while minimizing the associated control overhead"
          ],
          correctAnswer: 0,
          justification: "Please refer to Slide 9 of Lecture 1 of Week 10"
        },
        {
          question: "Which of the following is/are involved in IIoT risk management?",
          options: ["Avoiding risks", "Mitigating risks", "Accepting risks", "All of the above"],
          correctAnswer: 3,
          justification: "Please refer to Slide 8 of Lecture 2 of Week 10"
        },
        {
          question: "___________ stands for T in the STRIDE Threat Model of IoT security architecture.",
          options: ["Tampering", "Temporary", "Time", "Tolerance"],
          correctAnswer: 0,
          justification: "Please refer to Slide 10 of Lecture 2 of Week 10"
        },
        {
          question: "Which of the following is not an IIoT Attack Vector in the Application Layer?",
          options: ["Data spoofing", "SQL injection", "Replay attack", "Misrouting"],
          correctAnswer: 3,
          justification: "Please refer to Slide 12 of Lecture 2 of Week 10"
        },
        {
          question: "_____________ includes trust requirements to devices and ensure trust compatibility with other components.",
          options: ["Hardware developer", "Software developers", "Front-end engineer", "Web designer"],
          correctAnswer: 0,
          justification: "Please refer to Slide 20 of Lecture 2 of Week 10"
        },
        {
          question: "Which of the following is mandatory for ensuring the security of the entire system in IIoT?",
          options: ["Increase in network latency", "Data protection", "Reducing network throughput", "Open source software"],
          correctAnswer: 1,
          justification: "Please refer to Slide 2 of Lecture 3 of Week 10"
        },
        {
          question: "Which of the following is/are provisioned by cloud security?",
          options: ["Data Privacy", "Access Control", "Identity Management", "All of the above"],
          correctAnswer: 3,
          justification: "Please refer to Slide 10 of Lecture 3 of Week 10"
        },
        {
          question: "Which of the following is NOT a feature of a smart factory?",
          options: ["Continuous real-time data", "Maximized manual intervention", "Live metrics for quick decision", "Flexibility and adaptability"],
          correctAnswer: 1,
          justification: "Please refer to Slide 5 of Lecture 4 of Week 10"
        },
        {
          question: "“DeWalt is a tool manufacturer which launched the Construction Internet of Things initiative.” State True or False.",
          options: ["True", "False"],
          correctAnswer: 0,
          justification: "Please refer to Slide 9 of Lecture 4 of Week 10"
        },
        // Continue adding all other new questions here in the same format...
        {
            question: "Network monitoring, management, and optimization are performed at the ___________ of the SDIIoT architecture.",
            options: ["Data plane", "Application plane", "Control plane", "User plane"],
            correctAnswer: 2,
            justification: "Please refer to Slide 4 of Lecture 1 of Week 10"
          },
          {
            question: "S stands for __________  in SCADA.",
            options: ["Supervisory", "Satisfactory", "Superficial", "Suspended"],
            correctAnswer: 0,
            justification: "Please refer to Slide 13 of Lecture 1 of Week 10"
          },
          {
            question: "Which of the following statements is false about Software-Defined 6TiSCH?",
            options: [
              "Slicing mechanism is proposed in Layer-256",
              "Slicing mechanism isolates the control overhead",
              "Allows deterministic and low-latency SDN controller communication",
              "Advantages of SDN is utilized, while minimizing the associated control overhead"
            ],
            correctAnswer: 0,
            justification: "Please refer to Slide 9 of Lecture 1 of Week 10"
          },
          {
            question: "Which of the following is/are involved in IIoT risk management?",
            options: ["Avoiding risks", "Mitigating risks", "Accepting risks", "All of the above"],
            correctAnswer: 3,
            justification: "Please refer to Slide 8 of Lecture 2 of Week 10"
          },
          {
            question: "___________ stands for T in the STRIDE Threat Model of IoT security architecture.",
            options: ["Tampering", "Temporary", "Time", "Tolerance"],
            correctAnswer: 0,
            justification: "Please refer to Slide 10 of Lecture 2 of Week 10"
          },
          {
            question: "Which of the following is not an IIoT Attack Vector in the Application Layer?",
            options: ["Data spoofing", "SQL injection", "Replay attack", "Misrouting"],
            correctAnswer: 3,
            justification: "Please refer to Slide 12 of Lecture 2 of Week 10"
          },
          {
            question: "_____________ includes trust requirements to devices and ensure trust compatibility with other components.",
            options: ["Hardware developer", "Software developers", "Front-end engineer", "Web designer"],
            correctAnswer: 0,
            justification: "Please refer to Slide 20 of Lecture 2 of Week 10"
          },
          {
            question: "Which of the following is mandatory for ensuring the security of the entire system in IIoT?",
            options: ["Increase in network latency", "Data protection", "Reducing network throughput", "Open source software"],
            correctAnswer: 1,
            justification: "Please refer to Slide 2 of Lecture 3 of Week 10"
          },
          {
            question: "Which of the following is/are provisioned by cloud security?",
            options: ["Data Privacy", "Access Control", "Identity Management", "All of the above"],
            correctAnswer: 3,
            justification: "Please refer to Slide 10 of Lecture 3 of Week 10"
          },
          {
            question: "Which of the following is NOT a feature of a smart factory?",
            options: ["Continuous real-time data", "Maximized manual intervention", "Live metrics for quick decision", "Flexibility and adaptability"],
            correctAnswer: 1,
            justification: "Please refer to Slide 5 of Lecture 4 of Week 10"
          },
          {
            question: "“DeWalt is a tool manufacturer which launched the Construction Internet of Things initiative.” State True or False.",
            options: ["True", "False"],
            correctAnswer: 0,
            justification: "Please refer to Slide 9 of Lecture 4 of Week 10"
          },
          {
            question: "Which of the following statements is/are incorrect about ABB -YuMi?",
            options: ["It is a power and robotics firm", "It operates across only one continent", "It monitors robots via connected sensors", "All of the above"],
            correctAnswer: 1,
            justification: "Please refer to Slide 10 of Lecture 4 of Week 10"
          },
          {
            question: "“Maersk is a container shipping company that tracks assets and fuel consumption using sensors and uses IoT for preserving refrigerated containers.” State True or False.",
            options: ["True", "False"],
            correctAnswer: 0,
            justification: "Please refer to Slide 18 of Lecture 4 of Week 10"
          },
          {
            question: "How does the application of IoT help in the food industry?",
            options: ["By monitoring equipment performance", "By detecting anomaly in production line", "Both (a) and (b)", "Neither (a) nor (b)"],
            correctAnswer: 2,
            justification: "Please refer to Slide 4-5 of Lecture 5 of Week 10"
          },
          {
            question: "“SDN increases the complexity of the traditional networks by introducing a centralized control structure through the separation of the control plane from the data plane.” State True or False.",
            options: ["True", "False"],
            correctAnswer: 1,
            justification: "Please refer to the book: Introduction to Internet of Things, chapter no.-15, page no.-316"
          },
          {
            question: "Why is fog computing important for IIoT applications?",
            options: ["To decrease the cloud storage capacity", "To provision immediate action and quick response to time-sensitive data", "To eliminate local data processing", "To eliminate the need for provisioning data security"],
            correctAnswer: 1,
            justification: "Please refer to Slide 2 of Lecture 1 of Week 9"
          },
          
          {
            question: "Which of the following layers in the IoT architecture is responsible for data collection and interfacing with physical objects?",
            options: ["Perception layer", "Application layer", "Network layer", "Control layer"],
            correctAnswer: 0,
            justification: "Please refer to Slide 6 of Lecture 1 of Week 9"
          },
          {
            question: "In IIoT, data transmission between devices is secured by __________.",
            options: ["Encryption", "Compression", "Formatting", "Synchronization"],
            correctAnswer: 0,
            justification: "Please refer to Slide 8 of Lecture 2 of Week 9"
          },
          {
            question: "Which of the following best describes the function of predictive maintenance in IIoT?",
            options: [
              "Repairs equipment only after failure occurs",
              "Uses data and analytics to predict and prevent failures",
              "Increases maintenance frequency to avoid downtime",
              "Eliminates the need for maintenance"
            ],
            correctAnswer: 1,
            justification: "Please refer to Slide 10 of Lecture 3 of Week 9"
          },
          {
            question: "______________ is a protocol commonly used in IIoT for lightweight, reliable data transmission between devices.",
            options: ["HTTP", "MQTT", "SMTP", "FTP"],
            correctAnswer: 1,
            justification: "Please refer to Slide 12 of Lecture 1 of Week 9"
          },
          {
            question: "What is the role of edge computing in IIoT?",
            options: [
              "Processes data in centralized cloud servers",
              "Reduces the amount of data sent to the cloud by processing locally",
              "Increases latency by routing all data to remote data centers",
              "Minimizes security by avoiding encryption"
            ],
            correctAnswer: 1,
            justification: "Please refer to Slide 15 of Lecture 2 of Week 9"
          },
          {
            question: "Which of the following attacks targets the integrity of data in IIoT networks?",
            options: ["Data spoofing", "Phishing", "Denial of service", "Eavesdropping"],
            correctAnswer: 0,
            justification: "Please refer to Slide 16 of Lecture 3 of Week 9"
          },
          {
            question: "In IIoT, _____________ refers to the automated coordination and control of devices without human intervention.",
            options: ["Autonomy", "Interfacing", "Manual operation", "Human monitoring"],
            correctAnswer: 0,
            justification: "Please refer to Slide 18 of Lecture 4 of Week 9"
          },
          {
            question: "__________ in IIoT enables real-time response to events close to where data is generated.",
            options: ["Edge computing", "Data warehousing", "Remote processing", "Cloud storage"],
            correctAnswer: 0,
            justification: "Please refer to Slide 3 of Lecture 1 of Week 10"
          },
          {
            question: "Which of the following is NOT a benefit of using digital twins in IIoT?",
            options: [
              "Enhanced real-time monitoring",
              "Prediction of system failures",
              "Increased data redundancy",
              "Optimization of operations"
            ],
            correctAnswer: 2,
            justification: "Please refer to Slide 7 of Lecture 2 of Week 10"
          },
          {
            question: "In IIoT, sensors and actuators are typically found in the __________ layer.",
            options: ["Application", "Perception", "Network", "Control"],
            correctAnswer: 1,
            justification: "Please refer to Slide 5 of Lecture 3 of Week 9"
          },
          {
            question: "__________ is a protocol for machine-to-machine communication commonly used in IIoT for its lightweight, reliable messaging.",
            options: ["HTTP", "MQTT", "TCP/IP", "SMTP"],
            correctAnswer: 1,
            justification: "Please refer to Slide 8 of Lecture 4 of Week 10"
          },
          {
            question: "In the context of IIoT, what does the acronym 'DCS' stand for?",
            options: ["Data Communication System", "Distributed Control System", "Digital Computing System", "Dynamic Control System"],
            correctAnswer: 1,
            justification: "Please refer to Slide 11 of Lecture 3 of Week 9"
          },
          {
            question: "A key advantage of SDN in IIoT networks is its ability to __________.",
            options: [
              "Decentralize control functions",
              "Increase hardware dependency",
              "Enable central management and orchestration",
              "Reduce data security requirements"
            ],
            correctAnswer: 2,
            justification: "Please refer to Slide 14 of Lecture 1 of Week 10"
          },
          {
            question: "The primary purpose of a PLC (Programmable Logic Controller) in industrial environments is to __________.",
            options: [
              "Store large volumes of data",
              "Provide cloud-based computing power",
              "Control and automate machinery",
              "Serve as a network firewall"
            ],
            correctAnswer: 2,
            justification: "Please refer to Slide 13 of Lecture 2 of Week 9"
          },
          {
            question: "Which of the following is a fundamental component of a SCADA system?",
            options: ["Sensors", "User Interface", "Remote Terminal Unit (RTU)", "All of the above"],
            correctAnswer: 3,
            justification: "Please refer to Slide 18 of Lecture 1 of Week 10"
          },

          {
            question: "Which of the following is NOT typically considered a security threat in IIoT systems?",
            options: ["Data tampering", "Firmware updates", "Eavesdropping", "Denial of service"],
            correctAnswer: 1,
            justification: "Please refer to Slide 17 of Lecture 1 of Week 10"
          },
          {
            question: "In IIoT, a common use of digital twins is to __________.",
            options: [
              "Physically replicate devices",
              "Monitor and simulate system performance in real-time",
              "Store large amounts of raw data",
              "Directly control field devices"
            ],
            correctAnswer: 1,
            justification: "Please refer to Slide 6 of Lecture 2 of Week 10"
          },
          {
            question: "A primary feature of LoRaWAN in IIoT is its __________.",
            options: [
              "High bandwidth",
              "Low power consumption",
              "High data rate",
              "Short-range communication"
            ],
            correctAnswer: 1,
            justification: "Please refer to Slide 9 of Lecture 3 of Week 10"
          },
          {
            question: "What is the main advantage of using AI in IIoT for predictive maintenance?",
            options: [
              "Increased manual oversight",
              "Enhanced ability to predict equipment failures before they happen",
              "Elimination of all human labor",
              "Reduced data requirements"
            ],
            correctAnswer: 1,
            justification: "Please refer to Slide 14 of Lecture 4 of Week 9"
          },
          {
            question: "In IIoT, which component typically handles data aggregation and processing near the data source?",
            options: ["Edge gateway", "Data lake", "Cloud server", "User interface"],
            correctAnswer: 0,
            justification: "Please refer to Slide 5 of Lecture 1 of Week 10"
          },
          {
            question: "Which of the following protocols is best suited for high-reliability data transfer in IIoT applications?",
            options: ["MQTT", "FTP", "HTTP", "SMTP"],
            correctAnswer: 0,
            justification: "Please refer to Slide 10 of Lecture 3 of Week 10"
          },
          {
            question: "The IIoT concept that involves creating a virtual model of a physical asset to monitor and optimize its performance is called __________.",
            options: ["Digital twin", "Edge computing", "Cybersecurity", "Cloud computing"],
            correctAnswer: 0,
            justification: "Please refer to Slide 12 of Lecture 2 of Week 10"
          },
          {
            question: "What type of IIoT connectivity is typically used for remote, low-power devices over long distances?",
            options: ["Bluetooth", "Wi-Fi", "LoRaWAN", "Zigbee"],
            correctAnswer: 2,
            justification: "Please refer to Slide 11 of Lecture 1 of Week 10"
          },
          {
            question: "Which term describes the integration of physical and virtual worlds through connected devices, such as sensors and actuators, in IIoT?",
            options: ["Machine learning", "Industrial internet", "Digital transformation", "Smart factory"],
            correctAnswer: 3,
            justification: "Please refer to Slide 8 of Lecture 4 of Week 10"
          },
          {
            question: "A characteristic of edge computing in IIoT is __________.",
            options: [
              "Centralizing all data in a cloud server",
              "Reducing latency by processing data close to the source",
              "Limiting device autonomy",
              "Using high-power consumption devices only"
            ],
            correctAnswer: 1,
            justification: "Please refer to Slide 13 of Lecture 2 of Week 9"
          },
          {
            question: "A key benefit of predictive analytics in IIoT is __________.",
            options: [
              "Improved decision-making based on historical data",
              "More manual maintenance scheduling",
              "Lower equipment costs",
              "Enhanced security measures"
            ],
            correctAnswer: 0,
            justification: "Please refer to Slide 7 of Lecture 3 of Week 9"
          },
          {
            question: "What role does a gateway play in an IIoT network?",
            options: [
              "Directly controls field devices",
              "Serves as a bridge between devices and the network",
              "Only stores data",
              "Acts as a user interface"
            ],
            correctAnswer: 1,
            justification: "Please refer to Slide 4 of Lecture 1 of Week 10"
          },
          {
            question: "Which technology is often used in IIoT to reduce data transmission to the cloud by processing data locally?",
            options: ["Data mining", "Edge computing", "Data warehousing", "Network slicing"],
            correctAnswer: 1,
            justification: "Please refer to Slide 2 of Lecture 2 of Week 9"
          },
          {
            question: "Which protocol is especially useful for IIoT applications that require low power and low data rate communications?",
            options: ["Wi-Fi", "LoRa", "Ethernet", "5G"],
            correctAnswer: 1,
            justification: "Please refer to Slide 3 of Lecture 3 of Week 10"
          },
          {
            question: "The main benefit of using a SCADA system in IIoT is to __________.",
            options: [
              "Analyze data directly at the source",
              "Provide remote monitoring and control of equipment",
              "Increase hardware costs",
              "Reduce system reliability"
            ],
            correctAnswer: 1,
            justification: "Please refer to Slide 18 of Lecture 4 of Week 9"
          }
                              
      
  ];
  

export default function AttractiveQuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return // Prevent changing answer after selection
    setSelectedAnswer(answerIndex)
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return // Prevent moving ahead without answering

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizCompleted(false)
  }

  const currentQuestionData = quizQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-2xl font-bold text-center">
            {quizCompleted ? "Quiz Completed!" : `Question ${currentQuestion + 1} of ${quizQuestions.length}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {quizCompleted ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Trophy className="w-24 h-24 mx-auto mb-4 text-yellow-400" />
                <h2 className="text-3xl font-bold mb-4">Your Score</h2>
                <p className="text-4xl font-bold text-primary mb-6">{score} / {quizQuestions.length}</p>
                <Button onClick={resetQuiz} size="lg" className="font-semibold">
                  Restart Quiz
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">{currentQuestionData.question}</h2>
                <div className="space-y-3">
                  {currentQuestionData.options.map((option, index) => (
                    <Button
                      key={index}
                      className={`w-full text-left justify-start h-auto py-3 px-4 ${
                        selectedAnswer === index 
                          ? index === currentQuestionData.correctAnswer
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-red-500 hover:bg-red-600'
                          : ''
                      }`}
                      variant={selectedAnswer === null ? "outline" : "default"}
                      onClick={() => handleAnswerClick(index)}
                    >
                      <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                      {selectedAnswer === index && (
                        index === currentQuestionData.correctAnswer 
                          ? <CheckCircle2 className="ml-auto" />
                          : <XCircle className="ml-auto" />
                      )}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex flex-col items-center bg-muted p-4">
          {!quizCompleted && (
            <>
              <div className="w-full mb-4">
                <Progress value={(currentQuestion + 1) / quizQuestions.length * 100} className="h-2" />
              </div>
              <div className="flex justify-between w-full">
                <p className="text-sm font-medium">Score: {score}</p>
                <Button 
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="font-semibold"
                >
                  {currentQuestion === quizQuestions.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}